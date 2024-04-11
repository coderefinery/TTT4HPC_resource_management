# How to test this lesson

Below is a checklist for those who want to test this lesson on their cluster
and who might not have time to go through the entire lesson.


## Slurm is available

We will submit Slurm jobs as example.


## We can compile a C code with MPI

Something like `mpicc example.c -o example` should work.


## We can compile a Fortran code

Something like `gfortran example.f90 -o example` should work.


## sacct is available

```console
sacct -j 10404698 --format=MaxRSS

    MaxRSS
----------

  3210588K
         0
```


## /usr/bin/time is available

And you can run it on any command like this:
```{code-block} console
:emphasize-lines: 12

$ /usr/bin/time -v python example.py

Command being timed: "python example.py"
User time (seconds): 3.62
System time (seconds): 0.27
Percent of CPU this job got: 99%
Elapsed (wall clock) time (h:mm:ss or m:ss): 0:03.92
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 408884
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 0
Minor (reclaiming a frame) page faults: 91345
Voluntary context switches: 36
Involuntary context switches: 36
Swaps: 0
File system inputs: 0
File system outputs: 0
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```


## Optional: seff

```console
$ seff 10404725

Job ID: 10404725
Cluster: saga
User/Group: someuser/someuser
State: COMPLETED (exit code 0)
Nodes: 1
Cores per node: 8
CPU Utilized: 00:05:06
CPU Efficiency: 86.93% of 00:05:52 core-walltime
Job Wall-clock time: 00:00:44
Memory Utilized: 1.84 GB (estimated maximum)
Memory Efficiency: 23.01% of 8.00 GB (1.00 GB/core)
```
