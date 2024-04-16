#include <getopt.h>
#include <math.h>
#include <mpi.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

static struct option long_options[] = {
    {"count", required_argument, 0, 'c'},
    {"steps", required_argument, 0, 's'},
    {"network-penalty", required_argument, 0, 'n'},
    {0, 0, 0, 0}};

void generate_random_numbers(float *numbers, int num_numbers, float min,
                             float max) {
  for (int i = 0; i < num_numbers; i++) {
    numbers[i] = ((float)rand() / RAND_MAX) * (max - min) + min;
  }
}

// adjust velocities and positions for a batch of planets based on the positions
// of all other planets
void move_planets(float *px, float *py, float *pz, float *vx, float *vy,
                  float *vz, float *px_all, float *py_all, float *pz_all,
                  float *masses, float dt, int num_planets_this_task,
                  int num_planets_all) {
  // gravitational constant
  const float G = 1.0;

  for (int i = 0; i < num_planets_this_task; i++) {
    float acceleration_x = 0.0;
    float acceleration_y = 0.0;
    float acceleration_z = 0.0;
    for (int j = 0; j < num_planets_all; j++) {
      // calculate direction vector from planet i to planet j
      float direction_x = px_all[j] - px[i];
      float direction_y = py_all[j] - py[i];
      float direction_z = pz_all[j] - pz[i];

      // normalize direction vector
      float distance =
          sqrt(direction_x * direction_x + direction_y * direction_y +
               direction_z * direction_z);

      float distance3 = distance * distance * distance;

      if (i != j) {
        acceleration_x += G * masses[j] * direction_x / distance3;
        acceleration_y += G * masses[j] * direction_y / distance3;
        acceleration_z += G * masses[j] * direction_z / distance3;
      }
    }
    // modify velocity
    vx[i] += acceleration_x * dt / masses[i];
    vy[i] += acceleration_y * dt / masses[i];
    vz[i] += acceleration_z * dt / masses[i];

    // update position of planet i
    px[i] += vx[i] * dt;
    py[i] += vy[i] * dt;
    pz[i] += vz[i] * dt;
  }
}

int main(int argc, char *argv[]) {
  MPI_Init(&argc, &argv);

  clock_t begin = clock();

  int opt = 0;
  int option_index = 0;

  if (argc == 1) {
    fprintf(
        stderr,
        "Usage: %s --count=<value> --steps=<value> --network-penalty=<value>\n",
        argv[0]);
    MPI_Abort(MPI_COMM_WORLD, 1);
  }

  int num_planets_all = 0;
  int num_steps = 0;
  int network_penalty = 1;

  while ((opt = getopt_long(argc, argv, "s:", long_options, &option_index)) !=
         -1) {
    switch (opt) {
    case 'c':
      num_planets_all = atoi(optarg);
      break;
    case 's':
      num_steps = atoi(optarg);
      break;
    case 'n':
      network_penalty = atoi(optarg);
      break;
    default:
      fprintf(stderr,
              "Usage: %s --count=<value> --steps=<value> "
              "--network-penalty=<value>\n",
              argv[0]);
      MPI_Abort(MPI_COMM_WORLD, 1);
    }
  }

  // time step
  const float dt = 0.1;

  int world_size, world_rank;
  MPI_Comm_size(MPI_COMM_WORLD, &world_size);
  MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);

  // random seed
  srand(time(NULL) + world_rank);

  int num_planets_this_task = num_planets_all / world_size;
  int remainder = num_planets_all % world_size;

  // distribute the remainder among the first ranks
  if (world_rank < remainder) {
    num_planets_this_task++;
  }

  float *px_local = (float *)malloc(sizeof(float) * num_planets_this_task);
  float *py_local = (float *)malloc(sizeof(float) * num_planets_this_task);
  float *pz_local = (float *)malloc(sizeof(float) * num_planets_this_task);

  generate_random_numbers(px_local, num_planets_this_task, -100.0, 100.0);
  generate_random_numbers(py_local, num_planets_this_task, -100.0, 100.0);
  generate_random_numbers(pz_local, num_planets_this_task, -100.0, 100.0);

  float *vx_local = (float *)malloc(sizeof(float) * num_planets_this_task);
  float *vy_local = (float *)malloc(sizeof(float) * num_planets_this_task);
  float *vz_local = (float *)malloc(sizeof(float) * num_planets_this_task);
  generate_random_numbers(vx_local, num_planets_this_task, -0.1, 0.1);
  generate_random_numbers(vy_local, num_planets_this_task, -0.1, 0.1);
  generate_random_numbers(vz_local, num_planets_this_task, -0.1, 0.1);

  float *px_all = (float *)malloc(sizeof(float) * num_planets_all);
  float *py_all = (float *)malloc(sizeof(float) * num_planets_all);
  float *pz_all = (float *)malloc(sizeof(float) * num_planets_all);

  float *masses = (float *)malloc(sizeof(float) * num_planets_all);
  generate_random_numbers(masses, num_planets_all, 0.01, 10.0);

  // allocate buffers for MPI_Allgatherv
  // sendcounts: number of elements to send to each rank
  // displacements: offset in recvbuf to place incoming data
  int *sendcounts = (int *)malloc(sizeof(int) * world_size);
  int *displacements = (int *)malloc(sizeof(int) * world_size);

  // set sendcounts
  for (int i = 0; i < world_size; i++) {
    sendcounts[i] = num_planets_all / world_size;
    if (i < remainder) {
      sendcounts[i]++;
    }
  }

  // from sendcounts, calculate displacements
  for (int i = 0; i < world_size; i++) {
    displacements[i] = 0;
    for (int j = 0; j < i; j++) {
      displacements[i] += sendcounts[j];
    }
  }

  MPI_Datatype mystruct_mpi_type;
  MPI_Type_contiguous(3, MPI_FLOAT, &mystruct_mpi_type);
  MPI_Type_commit(&mystruct_mpi_type);

  for (int step = 0; step < num_steps; step++) {
    // communicate positions
    // the network_penalty can be used to increase the effect of communication
    for (int ik = 0; ik < network_penalty; ik++) {
      MPI_Allgatherv(px_local, num_planets_this_task, MPI_FLOAT, px_all,
                     sendcounts, displacements, MPI_FLOAT, MPI_COMM_WORLD);
      MPI_Allgatherv(py_local, num_planets_this_task, MPI_FLOAT, py_all,
                     sendcounts, displacements, MPI_FLOAT, MPI_COMM_WORLD);
      MPI_Allgatherv(pz_local, num_planets_this_task, MPI_FLOAT, pz_all,
                     sendcounts, displacements, MPI_FLOAT, MPI_COMM_WORLD);
    }

    // update velocities and positions
    move_planets(px_local, py_local, pz_local, vx_local, vy_local, vz_local,
                 px_all, py_all, pz_all, masses, dt, num_planets_this_task,
                 num_planets_all);
  }

  // deallocate buffers
  free(sendcounts);
  free(displacements);

  free(px_local);
  free(py_local);
  free(pz_local);

  free(vx_local);
  free(vy_local);
  free(vz_local);

  free(px_all);
  free(py_all);
  free(pz_all);

  clock_t end = clock();
  double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;

  if (world_rank == 0) {
    printf("Simulation completed on %d cores after %.2f sec: %d planets and %d "
           "steps.\n",
           world_size, time_spent, num_planets_all, num_steps);
  }

  MPI_Finalize();
  return 0;
}
