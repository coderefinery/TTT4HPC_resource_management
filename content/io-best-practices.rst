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


Data Format Demos
-----------------

We show the effect of reading many small files vs one large file.
In a shared file system, file system operations are slower than
one would expect from experience with a local disk. Files are
stored on many disks and reading one usually requires some
communication between nodes. But it's actually a bit worse than
that. The file system needs to find metadata for the file first,
to determine where to actually find the data.

Reading a single large file sequentially is usually significantly
faster.

 - The repository containing the demo examples is at
   https://github.com/coderefinery/ttt4hpc-io-examples


1. Setup

.. code-block:: bash
   # Clone the repository and setup
   git clone https://github.com/coderefinery/ttt4hpc-io-examples
   cd ttt4hpc-io-examples
   pip install -r requirements

   cd data_formats
   python generate_data.py
   python create_archive.py

First, let's check the files we created. They are in the `data` 
folder. Each csv file contains an activity measurement for each 
hour of the day. There is data for 20 year, so 175200 rows all 
together in 7300 files.


2. Naive example reading all the files.

Here we read all of these files into memory and create a pandas
dataframe. The approach in `read_files_naive.py` is the simplest
way we would first write this. The version in `read_files.py` only
reads the files in the loop, and gives a more fair comparison.

.. code-block:: python
   strace -c -e trace=file python read_files.py

strace shows the number of file system calls. In this case we count
file system operations.


3. Example reading a single archive sequentially

This example reads the same data from the tar archive. An
uncompressed tar file is essentially just a concatenation of the
contents of the files.

We use the streaming mode for reading the archive. This means the
files have to be read in order. Otherwise we would still generate A
large number of file system calls.

.. code-block:: python
   strace -c -e trace=file python read_archive.py


4. Random access

Say we need to read the files in randomized order. This is common
in training machine learning models. In this case reading from the
the archive is not that helpful, since we cannot stream the
contents.

.. code-block:: python
   strace -c -e trace=file python read_archive_random.py

This is not great. How would you avoid reading the files out of 
order?

In this case, the whole data fits in memory. Even if it didn't, 
it's usually good enough to read the file in chunks and shuffle the
chunks in memory.

.. code-block:: python
   strace -c -e trace=file python read_random_chunked.py



I/O Workflows
-------------

 - How does a network file system work? What is Lustre? What happens
   when I ask for the contents of a file?

 - Even a normal file system is generally much slower than a RAM, 
   CPUs or GPUs. Computations have to wait for many cycles for each
   I/O operation.

 - Network file systems and shared file systems and have even more
   latency. Performance also depends on what other users are doing.

 - Bad I/O hampers interactive use. Waiting for a file to load can
   be frustrating.



Common issues:

 - Order of operations: Reading a file many times because the
   function is called in a loop.
 - Jenga: When reading the same data again and again in loop, for
   machine learning for example. One epoch may not show the issue.
 - Carrying everything with you: You never delete any input data.
   Everything is kept in ram and takes space.
 - "She'll have the steak": Data format is chosen for manual 
   when the amount of data is small, or for inspection and plotting.
   The format is not optimal for the actual use case.

A profiler can detect I/O patterns and this can be useful for identifying
bottlenecks. However, this is mostly a workflow issue. The best way
to 


Local Disks and RAM Disks
-------------------------

- Demonstrate moving data to a local disk before running

``` bash
unzip -d /tmp/data data.zip
python train_model.py --data /tmp/data
```

- One IO operation on the shared system, then fast


- Try creating and reading a large file locally and on lustre

   ``` bash
   time dd if=/dev/zero of=largefile bs=1024M count=50
   ```

- Try reading the large file

   ``` bash
   time md5sum largefile
   ```


Machine Learning and Large data
-------------------------------

Training large machine learning models requires a lot of data.
Storing and accessing the data can easily become a bottleneck. It's
easy to starve the GPUs for data just because accessing the input
files on disk is too slow.

Different frameworks have their own formats, but they work in
similar ways. They allow storing large datasets in shards, each
containing several gigabytes of data. Sharding allows splitting the
data accross disks and reading with multiple threads. Data can also
be randomized within a batch or a shard.

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
