I/O Best Practices
==================

.. objectives::

   * Reading files is a common bottleneck
   * One large file is usually faster than many small files
   * Local hard disks and ramdisks can be much faster

   This lesson is largely a demonstration with some exercises. We
   recommend following the demonstration. It is possible to try
   running the demonstration yourself, but this is not intended as
   a type along.

.. prerequisites::

   * No prerequisites for following the demo
   
   You can find the demo code and setup instructions at
   https://github.com/coderefinery/ttt4hpc-io-examples.



First sentence that summarizes the lesson, suitable for preview text.
A first paragraph really motivating why you would need the material
presented on this page, and why it is exciting. Don't go into details.

Then, another paragraph going into the big picture of what you will do
and how you will do it. Not details, but enough so that someone knows
the overall path.


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

... code-block:: bash
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

... code-block:: python
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

... code-block:: python
   python read_archive.py


4. Random access

Say we need to read the files in randomized order. This is common
in training machine learning models. In this case reading from the
the archive is not that helpful, since we cannot stream the
contents.

... code-block:: python
   python read_archive_random.py

This is not great. How would you avoid reading the files out of 
order?

In this case, the whole data fits in memory. Even if it didn't, 
it's usually good enough to read the file in chunks and shuffle the
chunks in memory.

... code-block:: python
   python read_random_chunked.py



I/O Workflows
-------------

A profiler can detect I/O patterns and this can be useful for identifying
bottlenecks. However, this is mostly a problem of workflows.

How would you set up a file system that can be accessed from a large
number of nodes?

 - How does a network file system work? What is Lustre?

 - How do I study or profile I/O patterns?

 - What can I do to optimize it?



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

... code-block:: bash
   python create_dataset.py

2. Reading a sharded dataset

... code-block:: bash
   python imagenet.py


Note that the data does not need to be downlaoded and stored
locally for webdataset. The library can also handle http addresses
directly, and has a protocol for general UNIX pipes.

... code-block:: python
   wds.WebDataset("filename.tar")

is equivalent to

... code-block:: python
   wds.WebDataset("pipe:cat filename.tar")

This makes webdataset very general and flexible. Unfortunately, 
though, the data needs to be stored in a tar file.



Summary
-------



See also
--------

* Link
* Link
