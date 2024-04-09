Exercises
=========


Exercise 2.1
------------

This code runs a parameter search with a fast simulation step. The
function `simulate` runs on GPUs and is very fast. How would you
improve the I/O performance of this code?

.. code-block:: python
    for parameter in parameters:
        for datafile in datafiles:
            with open(datafile) as f:
                data = f.read()
    
            result = simulate(data, parameter)
    
            with open('results.json', 'a') as f:
                f.write(json.dumps(result))


Exercise 2.2
------------

TODO: find MNIST example or similar
Download a ML training example. Count the number of file operations
in a single epoch.

Study the code and find where the file operations actually happen.
Can you improve the workflow to reduce load on the disk. Does this
improve performance?


Exercise 2.3
------------

Use dd to generate a large file. Try this on you local machine and
on an HPC system. Which is faster? When woudl the HPC system be
slower than a desktop?


