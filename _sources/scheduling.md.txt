# Job scheduling and Slurm basics

:::{admonition} Learning goals
- We understand what a job scheduler tries to do.
- We understand the dimensions of a job and how to specify them.
- Understand that job parameters affect not only **resource use** but also **how long
  it will queue**.
- Get a visual understanding of what a job scheduler does.
:::


## What is a supercomputer or cluster?

- Think of it as a **large collection of computers** that are connected together.
- Each of these computers is called a node and clusters often have thousands of such nodes.
- Each such **compute node** often has multiple cores (CPUs) and some memory.
- The cores/CPUs are often not faster than those in your laptop, but there are many more of them.
- The nodes are connected together by a **high-speed network**.
- The nodes typically share a **common file system**.
- We connect to clusters through **login nodes** and submit jobs to the **compute nodes**.


## What is Slurm?

- Provides a framework for **scheduling/queuing** and monitoring jobs on the compute nodes.
- It's like the "maitre d'" at a restaurant.
- Available at most supercomputers: most widely used job scheduler in high-performance computing.
- Open-source.


## A visual analogy

Do you remember playing this game?
:::{figure} img/typical-tetris-game.png
:alt: A typical Tetris game in play.
:width: 30%

A typical Tetris game in play. Source: [Wikipedia](https://en.wikipedia.org/wiki/Tetris) (public domain).
:::

For a **job scheduler**, computations look a bit like this:
:::{figure} img/scheduler-blocks.png
:alt: Visual analogy of a job scheduler.
:width: 80%

Visual analogy of a job scheduler. Calculations are like blocks that need to be
placed on the resources.
:::

:::{discussion}
- Calculations are rectangular in the eyes of the scheduler.
- The scheduler tries to fit the jobs into the available resources. In other
  words to "keep the bottom row always full".
- Motivation for the job scheduler: keep all cores busy all the time.
- Motivation for you as a user: get your job started and finished as soon as possible.
- There are long jobs that take time but only few cores (example: violet block).
- There are wide jobs that use many cores (example: green block).
- Cost of a job: the area of the rectangle.
- Now imagine there is one more dimension: memory. The memory and number of cores are not fully independent.
- The scheduler actually "plays Tetris with cubes".
:::


Now we better understand that choosing the right job parameters can be important
to determine when a job will start and how long it will take to finish:
:::{figure} img/backfilling.png
:alt: Visual analogy of a job scheduler with backfilling.
:width: 80%

Example for backfilling: Imagine the pink job just started but suddenly
crashes. What will the scheduler try to do?
:::


## Example Slurm job script

```bash
#!/usr/bin/env bash

#SBATCH --account=MYPROJECT
#SBATCH --job-name='example'
#SBATCH --time=0-00:05:00
#SBATCH --mem-per-cpu=1500M
#SBATCH --ntasks=4

# here is the actual command that will be executed
# sometimes it is a series of commands where we copy data, load modules, etc.
./mycode --arguments
```

Depending on the cluster we might need to specify:
- Partition: `#SBATCH --partition=SOMEPARTITION`
- Number of nodes: `#SBATCH --nodes=2`
- Number of tasks per node: `#SBATCH --ntasks-per-node=4`

Options that will become handy one day:
- Changing the name of the output and error files:
  - `#SBATCH --output=slurm-%j.out`
  - `#SBATCH --error=slurm-%j.err`
- Making the job dependent on another job: `#SBATCH --dependency=afterok:123456`
- Submitting an array of jobs: `#SBATCH --array=1-10`

One can specify and fine-tune a lot more:
<https://slurm.schedmd.com/sbatch.html>


## Submitting and monitoring a Slurm job

We recommend that you write a script like the one above and submit it with `sbatch`:
```console
$ sbatch my_job.sh
```

You can also specify the job parameters directly on the command line:
```console
$ sbatch --account=MYPROJECT --job-name='example' --time=0-00:05:00 --mem-per-cpu=1500M --ntasks=4 ./mycode --arguments
```

However, we recommend to use scripts since a **script is often more reproducible**
since you can find it few weeks later and know what you did. Or what your colleague
did who already left the group.

And here are the two most important commands to monitor your jobs:
```bash
# list all of your pending or running jobs
$ squeue --me

# cancel a job
$ scancel JOBID
```

There exist many more.


## How to choose job parameters

Back to our example script:
```bash
#!/usr/bin/env bash

#SBATCH --account=MYPROJECT
#SBATCH --job-name='example'
#SBATCH --time=0-00:05:00
#SBATCH --mem-per-cpu=1500M
#SBATCH --ntasks=4

# here is the actual command that will be executed
# sometimes it is a series of commands where we copy data, load modules, etc.
./mycode --arguments
```

Choosing the **time** (`--time`):
- `--time=days-hours:minutes:seconds`
- Most clusters have time limits for jobs (a day or a week or two weeks).
- Running your calculation for the first time? Start small and add more as you grow it.
- When you have an idea of how long a program would take to run, add perhaps 20% to the time.
- If you ask for too much time, your job will wait longer in the queue.
- When debugging a problem, try to reduce the system size and job time to reduce queue time.

Choosing the **number of cores** (`--ntasks`):
- We have a separate episode on this: {ref}`num-cores`.

Choosing the **memory** (`--mem-per-cpu`):
- We have a separate episode on this: {ref}`memory`.


## What if the job is a series of independent tasks?

Many jobs that are long-running iterate over a set of tasks or steps which
don't depend on each other:
:::{figure} img/jobs-loop.png
:alt: A long calculation that is a series of steps that don't depend on each other.
:width: 80%

A long calculation that is a series of steps that don't depend on each other.
:::

:::{figure} img/jobs-independent.png
:alt: The same calculation as above but split into independent tasks.
:width: 80%

The same calculation as above but split into independent tasks.
:::

:::{discussion}
Discuss the advantages and disadvantages of splitting a job into independent tasks.
:::


## What if the resource use of a job is uneven?

We mentioned earlier that to a job scheduler all jobs look like rectangles (or
cubes). But when you look at the resource use of a job, it might be uneven:
:::{figure} img/uneven.png
:alt: Visual analogy of a job with uneven resource use.
:width: 80%

Example for a job where the resource use (violet color) is uneven over time.
Gray color represents the resources which we requested from the scheduler.
:::

:::{discussion}
In this case it might be beneficial to split the job into smaller pieces.
And run them in sequence. Where would you cut in the above example?
:::
