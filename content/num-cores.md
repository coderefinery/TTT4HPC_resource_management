(num-cores)=

# How to choose the number of cores by timing a series of runs

:::{admonition} Learning goals
- Being able to reduce the system size to a **small enough size** to be able to
  test the scaling of a code.
- Timing a **series of runs** with increasing number of cores.
:::

:::{admonition} Beyond the scope of this tutorial
- Profiling a run to find out **why** it does not scale.
:::

In this demonstration or exercise we will run the same code on a series of
cores and measure the time spent in the code. This is a relatively simple
exercise which can be done on any cluster and is a very good starting point
before running a large number of jobs or before more detailed profiling.


## Why it matters

We request resources from the scheduler (queuing system).  But the scheduler
cannot tell how long the job will run and what resources it will really
consume.  Just the fact that I am asking the scheduler for 40 cores does not
mean that the code will actually run in parallel and use all of them.

Just because a website says that code X can run in parallel or "scales well"
does not mean that it will scale well for the particular feature/system/input
at hand.

Therefore **it is important to verify and calibrate this setting** for your use
case before computing very many similar jobs. Below we will show few
strategies.

Note that **you don't have to go through this for every single run**. This is
just to calibrate a job type. If many of your jobs have similar resource
demands, then the calibration will probably be meaningful for all of them.

- Asking for too few cores can lead to underused nodes or longer run time
- Asking for too many cores can mean wasted CPU resources
- Asking for too much can mean a lot longer queuing


## Example project: simulating the motion of planets

The [example
code](https://github.com/coderefinery/TTT4HPC_resource_management/blob/main/examples/planets.c)
that we will study is a simple N-body simulation written in C. It is not important or expected
that we understand the code in any detail.

The big picture is that the code simulates the motion of a number of planets:
- We can choose the number of planets.
- Each planet starts with a random position and velocity.
- At each time step, the code calculates the gravitational force between each pair of planets.
- The code updates the velocity and position of each planet.
- We can choose the number of time steps.
- The code can run on multiple cores and each core compute the gravitational force acting on a subset of planets.
- Before each force computation, the code needs to exchange the positions of planets between cores.

The code accepts command-line arguments to specify the number of planets, the
number of time steps, and a network penalty (has to be at least 1) that
simulates the cost of exchanging data between cores.

Here is an example run:
```console
$ ./planets --count=30000 --steps=10000 --network-penalty=200

Simulation completed on 4 cores after 11385 sec: 30000 planets and 10000 steps.
```

It does not matter so much what the code does. Here we wish to **find out how
this code scales** and what an optimum number of cores for it might be on our
system.  **This will give you the tools to do a similar study for your own
code**.


## How to download and compile the example code

You can download the code directly from the web to the cluster
(click
[here](https://github.com/coderefinery/TTT4HPC_resource_management/blob/main/examples/planets.c)
if you first wish to inspect the code):
```bash
$ wget https://raw.githubusercontent.com/coderefinery/TTT4HPC_resource_management/main/examples/planets.c
```

We can build our example binary with this script (`compile.sh`):
```bash
#!/usr/bin/env bash

mpicc -O3 planets.c -o planets -lm
```

Notes:
- You typically need to load a compiler module before compiling.
- Cray-type systems have a special compiler wrapper `cc` that you can use instead of `mpicc`.



## Before we start: let us make the system as small as possible, but not smaller

**This is such an important skill and often overlooked**. A good test run
or debug run is as short as possible and as large as necessary.

Instead of running the code on 10000 steps and waiting for hours, perhaps we
can get the same information from 100 steps? Here we assume that the total run
time is proportional to the number of steps. This is relatively easy to check.

Therefore, before embarking on a scaling study, let us first reduce the number of steps:
```console
$ ./planets --count=30000 --steps=100 --network-penalty=200

Simulation completed on 4 cores after 113.81 sec: 30000 planets and 100 steps.
```

The run does not have to be realistic in terms of the research question. It should
be however representative for the real run later.


## Series of calculations by varying the number of cores

Now take the following example script but you need to adapt it for your cluster:
```{code-block}
---
emphasize-lines: 7-8
---
#!/usr/bin/env bash

#SBATCH --account=MYPROJECT

#SBATCH --job-name='8-core'
#SBATCH --time=0-00:09:00
#SBATCH --ntasks=8
#SBATCH -o 8.out

module purge
module load foss/2022b

time srun ./planets --count=30000 --steps=100 --network-penalty=200
```

You need to adapt:
- The account name.
- Some clusters require specifying the memory per core.
- Some clusters use `mpirun` or `mpiexec` instead of `srun`.

Run a series of calculations on 1, 2, 4, 8, 16, 32, 64, 128, 256, ... cores.
The numbers do not have to be powers of two, but this is often what people do.

You might get the following timings:
```console
$ grep "Simulation completed" *.out | sort -n

1.out:Simulation completed on 1 cores after 419.88 sec: 30000 planets and 100 steps.
2.out:Simulation completed on 2 cores after 213.31 sec: 30000 planets and 100 steps.
4.out:Simulation completed on 4 cores after 113.81 sec: 30000 planets and 100 steps.
8.out:Simulation completed on 8 cores after 63.33 sec: 30000 planets and 100 steps.
16.out:Simulation completed on 16 cores after 34.27 sec: 30000 planets and 100 steps.
32.out:Simulation completed on 32 cores after 19.94 sec: 30000 planets and 100 steps.
64.out:Simulation completed on 64 cores after 14.78 sec: 30000 planets and 100 steps.
128.out:Simulation completed on 128 cores after 12.40 sec: 30000 planets and 100 steps.
256.out:Simulation completed on 256 cores after 15.92 sec: 30000 planets and 100 steps.
```

Or in tabular form:

| Number of cores | Time spent |
|-----------------|------------|
|   1             | 419.88 sec |
|   2             | 213.31 sec |
|   4             | 113.81 sec |
|   8             |  63.33 sec |
|  16             |  34.27 sec |
|  32             |  19.94 sec |
|  64             |  14.78 sec |
| 128             |  12.40 sec |
| 256             |  15.92 sec |

What can we conclude? And how can we explain it?

Conclusions:
- For this particular example it does not make sense to go much beyond 16 cores.
- Above 32 cores communication probably starts to dominate over computation.


## If it does not scale, what can be possible reasons?

Here are typical problems:
- At some point more time is spent communicating than computing
- Memory-bound jobs saturate the memory bandwidth
- At some point the non-parallelized code section dominates the compute time ([Amdahl's law](https://en.wikipedia.org/wiki/Amdahl%27s_law))


## What is MPI and OpenMP and how can I tell?

These two parallelization schemes are very common (but there exist other schemes):
- [Message passing interface](https://en.wikipedia.org/wiki/Message_Passing_Interface):
  typically each task allocates its own memory, tasks communicate via messages.
  It is no problem to go beyond one node.
- [OpenMP](https://www.openmp.org/):
  threads share memory and communicate through memory.
  We cannot go beyond one node.

**How to tell if the code is using one of the two?**
- If you wrote the software: then you probably know
- If it is written by somebody else:
  - It can be difficult to tell
  - Consult manual for the software or contact support (theirs or ours)

**Python/R/Matlab**
- Small self-written scripts are often not parallelized
- Libraries that you include in your scripts can use parallelization (e.g.
  `mpi4py` or `multiprocessing`)
