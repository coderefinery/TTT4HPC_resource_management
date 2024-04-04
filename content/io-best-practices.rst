I/O Best Practices
===========

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
   https://github.com/simo-tuomisto/data-format-tests.



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

Shows the effect of a proper data format. Also large number of files vs
one big file.

- https://github.com/coderefinery/ttt4hpc-io-examples

- Check file system calls using strace
   strace -c -e trace=file python aggregate_files.py

- Try creating and reading a large file locally and on lustre

   ``` bash
   time dd if=/dev/zero of=largefile bs=1024M count=50
   ```

- Try reading the large file

   ``` bash
   time md5sum largefile
   ```


I/O Workflows
-------------

A profiler can detect I/O patterns and this can be useful for identifying
bottlenecks. However, this is mostly a problem of workflows.

 - shared file system
How does a shared file system actually work. Set up a mental model.

 - A large number of small files is a problem
 - But so is random access inside a large file


Local Disks and RAM Disks
-------------------------

- Demonstrate moving data to a local disk before running

``` bash
unzip -d /tmp/data data.zip
python train_model.py --data /tmp/data
```

- One IO operation on the shared system, then fast


Machine Learning and Large data
-------------------------------

Demonstrate webdatasets for somewhat randomized access

 - Not actually random reads, but sufficiently random for most
   machine learning pipelines


Summary
-------



See also
--------

* Link
* Link
