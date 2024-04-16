I/O Best Practices
==================

.. objectives::

   * Reading files is a common bottleneck
   * One large file is usually faster than many small files
   * Local hard disks and ramdisks can be much faster


.. prerequisites::

   * No prerequisites for following the demo

   You can find the demo code and setup instructions at
   https://github.com/coderefinery/ttt4hpc-io-examples.

   If you wish to run the code, you will need Python and the
   packages listed in requirements.txt. You can install them with
   `pip install -r requirements.txt`.


In this lesson we discuss common I/O problems, diagnosing them and
avoiding them. I/O issues are usually about how the workflow is
structured and can be fixed or alleviated by restucturing, moving
the reads and writes to move convenient times or using the right
storage system.

This lesson is mostly a demonstration, with some general discussion.
We recommend you follow the demonstration and

- Filesystem can be the slowest part of many jobs
- networked filesystems tend to be best at large files, bad at many small


Quick primer: How files are accessed
------------------------------------

.. figure:: img/file_explanation.svg

   Figure 1: File structure

Files on file systems consist of:

  - metadata (who owns the file, when was the file last modified,
    how big is the file)
  - the file contents (actual contents of the data)

Programs check the metadata with ``stat``-calls. File contents are accessed
by creating a file descriptor with with an ``open``-call and then file
contents are either read using a ``read``-call or written using a
``write``-call.

For example, ``ls -l`` will check the metadata of a file while
``cat`` will open the file contents.

.. figure:: img/file_access.svg

   Figure 2: Different programs might access files in different ways


Data Format Demos
-----------------

We show the effect of reading many small files vs one large file.
In a shared file system, file system operations are slower than
one would expect from experience with a local disk. Files are
stored on many disks and reading one usually requires some
communication between nodes. But it's actually a bit worse than
that. The file system needs to find metadata for the file first,
to determine where to actually find the data.

.. note::

   The demo examples are at
   https://github.com/coderefinery/ttt4hpc-io-examples.
   Expected results are included in collapsed sections titles
   "expected result".


1. **Setup**

.. code-block:: bash

   # Clone the repository and setup
   git clone https://github.com/coderefinery/ttt4hpc-io-examples
   cd ttt4hpc-io-examples
   pip install --extra-index-url https://download.pytorch.org/whl/cpu -r requirements.txt

   cd data_formats_1
   python generate_data.py
   python create_archive.py

.. admonition:: expected result
   :class: dropdown

   This should create a folder `data` with 7300 csv files and an
   archive `data.tar` containing the same files.

First, let's check the files we created. They are in the `data`
folder. Each csv file contains an activity measurement for each
hour of the day. There is data for 20 year, so 175200 rows all
together in 7300 files.


2. **Naive example reading all the files**

Here we read all of these files into memory and create a pandas
dataframe. The approach in `read_files_naive.py` is the simplest
way we would first write this. The version in `read_files.py` only
reads the files in the loop, and gives a more fair comparison.

.. code-block:: python

   strace -c -e trace=%desc python read_files.py


.. admonition:: expected result
   :class: dropdown

   This should show a large number of file reads. In this case, it
   takes 3.6 seconds and opens 8028 files.

   .. code-block:: bash

      Time taken: 3.6240997314453125 seconds
      Mean: 2.4964045698924733
      % time     seconds  usecs/call     calls    errors syscall
      ------ ----------- ----------- --------- --------- ----------------
       31.83    0.441350          54      8028        23 open
       20.72    0.287255          18     15907           read
       18.65    0.258579          31      8318           close
       18.09    0.250797          15     15907           fstat
        4.88    0.067700           4     15806         3 lseek
        2.35    0.032638           4      7903      7896 ioctl
        1.66    0.022961          45       505           mmap
        1.22    0.016958          54       312           openat
        0.59    0.008121          13       624           getdents
        0.00    0.000018           9         2           write
        0.00    0.000003           0         4           fcntl
        0.00    0.000000           0         1           epoll_create1
      ------ ----------- ----------- --------- --------- ----------------
      100.00    1.386380                 73317      7922 total



strace shows the number of file system calls. In this case we count
file system operations.


3. **Example reading a single archive sequentially**

This example reads the same data from the tar archive. An
uncompressed tar file is essentially just a concatenation of the
contents of the files.

We use the streaming mode for reading the archive. This means the
files have to be read in order. Otherwise we would still generate A
large number of file system calls.

.. code-block:: python

   strace -c -e trace=%desc python read_archive.py


.. admonition:: expected result
   :class: dropdown

   This one should be faster and do fewer file reads. In my case it
   takes 1.1 seconds and opens 588 files.

   .. code-block:: bash

      Time taken: 1.0703248977661133 seconds
      Mean: 2.4964045698924733
      % time     seconds  usecs/call     calls    errors syscall
      ------ ----------- ----------- --------- --------- ----------------
       27.39    0.075740         128       588        22 open
       20.90    0.057777          22      2516           read
       15.91    0.043988          42      1027           fstat
       15.58    0.043066          67       638           close
        8.59    0.023747          25       926         3 lseek
        4.80    0.013264          25       511           mmap
        4.45    0.012307          26       463       456 ioctl
        1.48    0.004104          57        71           openat
        0.90    0.002500          17       142           getdents
        0.00    0.000007           3         2           write
        0.00    0.000005           1         4           fcntl
        0.00    0.000000           0         1           epoll_create1
      ------ ----------- ----------- --------- --------- ----------------
      100.00    0.276505                  6889       481 total


4. **Random access**

Say we need to read the files in randomized order. This is common
in training machine learning models. In this case reading from the
the archive is not that helpful, since we cannot stream the
contents.

.. note::


   Tar is actually a bad format for this. A tar file is always
   read sequentially. But independent of the file format, reading
   files in random order is slow on a network file system.

   Still, this is better than reading many small files.


.. code-block:: python

   strace -c -e trace=%desc python read_archive_random.py

.. admonition:: expected result
   :class: dropdown

   This should be slower than sequantial reading, but not create
   as many file reads as reading the files individually. In my case,
   it took 3.2 seconds and opened 591 files.

   .. code-block:: bash

      Time taken: 3.1685996055603027 seconds
      Mean: 2.4964045698924733
      % time     seconds  usecs/call     calls    errors syscall
      ------ ----------- ----------- --------- --------- ----------------
       24.14    0.091852         155       591        22 open
       21.52    0.081871          78      1038           read
       14.97    0.056972          55      1031           fstat
       13.78    0.052431          81       641           close
       13.64    0.051899           1     30693         3 lseek
        5.23    0.019895          38       511           mmap
        3.89    0.014816          31       467       460 ioctl
        1.86    0.007093          99        71           openat
        0.96    0.003658          25       142           getdents
        0.00    0.000018           9         2           write
        0.00    0.000005           1         4           fcntl
        0.00    0.000003           3         1           epoll_create1
      ------ ----------- ----------- --------- --------- ----------------
      100.00    0.380513                 35192       485 total



This is not great. How would you avoid reading the files out of
order?

In this case, the whole data fits in memory. Even if it didn't,
it's usually good enough to read the file in chunks and shuffle the
chunks in memory.

.. code-block:: python

   strace -c -e trace=%desc python read_random_chunked.py

.. admonition:: expected result
   :class: dropdown

   This should be as fast as the sequential read and read only a few
   files.

   .. code-block:: bash

      Time taken: 1.112762212753296 seconds
      Mean: 2.4964045698924733
      % time     seconds  usecs/call     calls    errors syscall
      ------ ----------- ----------- --------- --------- ----------------
       29.36    0.109168         185       588        22 open
       19.42    0.072187          28      2518           read
       16.78    0.062369          97       638           close
       14.71    0.054685          53      1027           fstat
        7.06    0.026230          28       926         3 lseek
        5.35    0.019879          38       512           mmap
        3.32    0.012342          26       463       456 ioctl
        2.51    0.009336         131        71           openat
        1.49    0.005554          39       142           getdents
        0.00    0.000011           2         4           fcntl
        0.00    0.000007           7         1           epoll_create1
        0.00    0.000000           0         2           write
      ------ ----------- ----------- --------- --------- ----------------
      100.00    0.371768                  6892       481 total


.. note::

   The strace output is not very readable. There are not many tools for
   parsing it into something more human readable. Here are a couple of
   examples we found:

   - https://github.com/cniethammer/strace-analyzer/:
     Written in `Rust <https://www.rust-lang.org>`_, so you
     need to `install Rust <https://www.rust-lang.org/tools/install>`_ first.

   - https://github.com/wookietreiber/strace-analyzer:
     Written in Python, but not as a package. Clone the repository to run
     the scripts.


I/O Workflows
-------------

Shared and Network File Systems
*******************************

 - How does a network file system work? What is Lustre? What happens
   when I ask for the contents of a file?

.. admonition:: Explanation of shared network filesystems
   :class: dropdown

   In high-performance clusters the file system is actually multiple
   metadata and object storage servers. This makes it possible to
   to store huge amounts of data with minimal risk of data loss in
   a case of a hardware failure and to provide access to the data
   with good throughput.

   .. figure:: img/lustre_explanation.svg

      Figure 3: Structure of a Lustre filesystem.

   Typical file access requires the filesystem client to ask the
   metadata servers where the file's data is stored and whether
   the user has sufficient rights to access the file.

   After this call is finished the file system client can contact
   the object storage server for the file contents. In both calls
   the server in question has to load the relevant
   metadata or data from disks that contain the data.

   These file systems are usually connected to compute nodes with a
   high speed interconnect, but each filesystem call will have some
   latency involved with it.

   Minimizing the number of file system calls and making sure that
   the program reads data in large chunks is the optimal way of
   accessing files in these systems.


File System is Slow
*******************

 - Even a normal file system is generally much slower than a RAM,
   CPUs or GPUs. Computations have to wait for many cycles for each
   I/O operation.

   .. admonition:: Typical transfer speeds
      :class: dropdown

      `Interface bit rates <https://en.wikipedia.org/wiki/List_of_interface_bit_rates>`_
      for different interfaces:

      .. list-table::

         * - **Interface**
           - **Approximate bandwidth**
         * - Hard drive
           - 0.6 GB/s
         * - NVMe SSD
           - 4-16 GB/s
         * - High-speed interconnect
           - 10-25 GB/s
         * - RAM memory
           - 10-50 GB/s
         * - GPU VRAM memory
           - 80-3500 GB/s

 - Network file systems and shared file systems and have even more
   latency. Performance also depends on what other users are doing.

 - Bad I/O hampers interactive use. Waiting for a file to load can
   be frustrating.



Common Issues
*************

 - Order of operations: Reading a file many times because the
   function is called in a loop.

   This is often hidden by a function call, maybe even to a library. This can be about understanding what libraries do, and using them correctly.

 - Accumulation: A bad IO pattern might not seem bad when simulation is run with a single computer or deep learning model is trained for one epoch (single pass through all the data). But in a larger scale or with a longer run, inefficiencies and bad access patterns accumulate.

   Essentially, 10% of a big number is still pretty big. Since file systems are a shared resource and usually not reserved for a job, it's possible to congest the whole system.

 - Carrying everything with you: All of the data is loaded, when only part of it is needed.

   Everything is kept in RAM and takes space. The job might not need all the resources it seems to need.

 - Wrong Format: Data format is chosen
   when the amount of data is small, or for inspection and plotting.
   The format is not optimal for the actual use case.

   A profiler can detect I/O patterns and this can be useful for identifying
   bottlenecks. However, this is mostly a workflow issue. Thinking through the
   workflow steps and testing them in isolation is often the best approach.

   Human readable data formats (CSVs, .txt, .json) are good when human is reading the
   file contents with an editor. If they are processed by code using binary formats can
   improve code's efficiency.


Local Disks and RAM Disks
-------------------------

Local Disks
***********

- Some systems have local disks on nodes. These are connected directly
  to the node and are much faster than network file systems.

- Check your system documentation for the local disk path.

- Local disks are usually not persistent. You need to copy data to
  to the local disk at the beginning of a job and copy results back
  at the end

  .. code-block:: bash
  
     unzip -d /tmp/data data.zip
  
     python train_model.py --data /tmp/data
  
     cp -r /tmp/results results


- Try creating and reading a large file locally and on lustre

   .. code-block:: bash

      time dd if=/dev/zero of=largefile bs=1024M count=50

- Try reading the large file

   .. code-block:: bash

      time md5sum largefile


Ramdisk
*******

- /dev/shm/ in linux

- A file system directly in random access memory. This is very fast,
  but limited by the available memory

- Reserve enough memory when queueing the job




Machine Learning and Large data
-------------------------------

Training large machine learning models requires a lot of data.
Storing and accessing the data can easily become a bottleneck. It's
easy to starve the GPUs for data just because accessing the input
files on disk is too slow.

This is usually further complicated by the fact that in each
training epoch all of the data needs to be loaded in random
order. To deal around this problem different frameworks have created
their own data formats, but they work in similar ways.

Typically large datasets are split into shards, where each shard
contains some random piece of the full dataset. Shards can be up to
multiple gigabytes in size.

When data is read during training multiple threads are usually used
to read the shards. Each thread loads data from random shard in
sequential order and shuffles the data in memory. Data is then
collected to master thread that creates a batch of data from inputs
of all data loaders.

.. figure:: img/sharded_dataloading.svg

   Figure 4: An example of a sharded data loading pipeline

Webdataset does this for PyTorch. It uses the POSIX tar format,
making it easy to handle on most HPC systems.


Demo in the webdataset folder.

1. Creating a dataset

.. code-block:: bash

   python create_dataset.py

2. Reading a sharded dataset

.. code-block:: bash

   python imagenet.py


Note that the data does not need to be downlaoded and stored
locally for webdataset. The library can also handle http addresses
directly, and has a protocol for general UNIX pipes.

.. code-block:: python

   wds.WebDataset("filename.tar")

is equivalent to

.. code-block:: python

   wds.WebDataset("pipe:cat filename.tar")

This makes webdataset very general and flexible. Unfortunately,
though, the data needs to be stored in a tar file.



Summary
-------



See also
--------

* Link
* Link
