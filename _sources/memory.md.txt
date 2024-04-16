(memory)=

# Measuring and choosing the right amount of memory


## Why it matters

This is because memory and CPU are not completely independent. If I ask for too
much memory, I also block the compute resources which carry that memory
resource at the same time.

A too generous "better safe than sorry" approach to memory allocation leads to these problems:
- Your compute account **gets charged too much** (problem for you and your
  allocation group, as well as for the tax payer financing these compute
  resources)
- Other users have to **wait longer with their jobs** (problem for us and for other users)
- Your **jobs may queue much longer** (problem for you) because the scheduler does
  not know that you might use a lot less memory than you ask it to reserve for you
- The **possibility to parallelize your job/workflow may be severely limited** if
  you ask for excessive amount of unused memory since there may not be enough
  memory left for parallel jobs running at the same time

It is important to make sure that your jobs use the right amount of memory
(below we show how to find out) and {ref}`the right number of CPUs
<num-cores>` in order to help you and others using the HPC
machines utilize these resources more efficiently, and in turn get work done
more speedily.

If you ask for too little memory, your job will be stopped and it might be
stopped late in the run.


## Run a test job before running many similar jobs

We recommend users to run a test job before submitting many similar runs to the
queue system and find out how much memory is used (see below for examples on
how to do that).  **Once you know, add perhaps 15-20% extra memory** (and runtime)
for the job compared to what your representative test case needed.


## How to get more memory if you need it

Speaking of right partition, one way to get more memory if a node is not enough
is to spread the job over several nodes by asking for more cores than needed.
But this comes at the price of paying for more resources, queuing longer, and
possibly blocking others.

A good alternative for jobs that need a lot of memory is often to use
high-memory nodes or high-memory partitions which are designed for jobs with
high memory demand.


## Example code

We can use the following example code:
```python
import random
import argparse
import time


# parse the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument(
    "--size", help="How many numbers to sum up", type=int, required=True
)
parser.add_argument(
    "--seconds", help="For how many seconds to wait", type=int, required=True
)
args = parser.parse_args()


# generate a bunch of random numbers
random_numbers = [random.uniform(-1.0, 1.0) for _ in range(args.size)]

# wait for few seconds, specified by --seconds
time.sleep(args.seconds)

# sum up and print the result
result = sum(random_numbers)
print(f"Result: {result}")
```

Example run:
```console
$ python example.py --size=5000 --seconds=5

Result: -47.64438375296812
```

This code run generates 5000 random numbers between -1 and 1, then waits for 5
seconds, and then sums up the numbers.


## Finding the memory high-water mark by prepending with /usr/bin/time -v

:::{admonition} Our goal
Now we want to measure how much memory this one consumes:
```bash
$ python example.py --size=50000000 --seconds=10
```
:::

In your job script instead of running `python example.py ...` directly, prepend it with `/usr/bin/time -v`:
```{code-block}
---
emphasize-lines: 13
---
#!/usr/bin/env bash

#SBATCH --account=MYPROJECT
#SBATCH --job-name='mem-profiling'
#SBATCH --time=0-00:05:00
#SBATCH --mem-per-cpu=2500M
#SBATCH --ntasks=1

# instead of this:
#                python example.py --size=50000000 --seconds=10

# we do this:
/usr/bin/time -v python example.py --size=50000000 --seconds=10
```

Then in the Slurm output we find:
```{code-block}
---
emphasize-lines: 10-10
---
Command being timed: "python example.py --size=50000000 --seconds=10"
User time (seconds): 54.44
System time (seconds): 1.27
Percent of CPU this job got: 84%
Elapsed (wall clock) time (h:mm:ss or m:ss): 1:05.97
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 1993080
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 0
Minor (reclaiming a frame) page faults: 417312
Voluntary context switches: 41
Involuntary context switches: 144
Swaps: 0
File system inputs: 3
File system outputs: 0
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```

The relevant information in this context is "Maximum resident set size
(kbytes)", in this case 1993080 kB. Note
that it has to be `/usr/bin/time -v` and `time -v` alone will not do it.


## Finding the memory high-water mark with sacct

As an example, I want to know this for my job which had the number `11166863`:
```console
$ sacct -j 11166863 --format=MaxRSS

    MaxRSS
----------

  1985340K
         0
```

But now try to reduce the size parameter to `--size=5000000` (one zero got removed).
Then rerun the job and compare the result from `/usr/bin/time -v` and
`sacct`:
- `/usr/bin/time -v` will give you ca. 200 MB
- `sacct` might give **zero** as result

The reason for the zero result is the sampling rate of `sacct`. Now increase
the seconds parameter to `--seconds=40` and compare the two again.

:::{admonition} Conclusions
- `/usr/bin/time -v` is more accurate and gives you the high-water mark.
- `sacct` is good for a rough estimate but is sampled typically every 30 seconds and might miss the peak.
- Once you know the high-water mark, add 15-20% extra memory for the job.
:::


## Sometimes the answer is not more memory but to rewrite the code

:::{note}
This section might only make sense if you use Python. Skip it
otherwise.
:::

Change the "[random.uniform...]" to "(random.uniform...)" in the highlighted line below.
Only two characters need to be changed, but the memory usage will be drastically reduced:
:::{code-block} python
---
emphasize-lines: 18
---
import random
import argparse
import time


# parse the command line arguments
parser = argparse.ArgumentParser()
parser.add_argument(
    "--size", help="How many numbers to sum up", type=int, required=True
)
parser.add_argument(
    "--seconds", help="For how many seconds to wait", type=int, required=True
)
args = parser.parse_args()


# generate a bunch of random numbers
random_numbers = [random.uniform(-1.0, 1.0) for _ in range(args.size)]

# wait for few seconds, specified by --seconds
time.sleep(args.seconds)

# sum up and print the result
result = sum(random_numbers)
print(f"Result: {result}")
:::

Now measure the memory high-water mark again and you will observe a massively
reduced memory usage.  Can you explain why?
