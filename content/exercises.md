# Exercises


## Exercise 1.1

Try to reproduce the results from {ref}`num-cores` using the example code on
your cluster.


## Exercise 1.2

Apply the methodology from {ref}`num-cores` to your own code
to find the optimal number of cores to use.


## Exercise 1.3

Try to reproduce the results from {ref}`memory` using the example code on
your cluster.


## Exercise 1.4

Apply the methodology from {ref}`memory` to your own code
to find how much memory it uses.


## Exercise 2.1

This code runs a parameter search with a fast simulation step. The
function `simulate` runs on GPUs and is very fast. How would you
improve the I/O performance of this code?

```python
for parameter in parameters:
    for datafile in datafiles:
        with open(datafile) as f:
            data = f.read()

        result = simulate(data, parameter)

        with open('results.json', 'a') as f:
            f.write(json.dumps(result))
```


## Exercise 2.2

Find an example machine learning training script in
<https://github.com/coderefinery/meteorological-data-processing-exercise>.
The data used is small enough to run on most systems, and the workflow
is not especially problematic from I/O perspectice.

1. You are preparing to use the workflow for a significantly larger dataset.
What should you take into account?

2. Count the number of file operations in a single epoch.

3. Study the code and find where the file operations actually happen.
   Can you improve the workflow to reduce load on the disk. Does this
   improve performance?


## Exercise 2.3

Use dd to generate a large file. Try this on you local machine and
on an HPC system. Which is faster? When would the HPC system be
slower than a desktop?


## Exercise 2.4: Meteorological data processing

Find an example meteorological data processing pipeline at
<https://github.com/coderefinery/meteorological-data-processing-exercise>.

1. Read the instructions in the readme and generate example data.
2. Research commonly used data types for this type of data.
3. When does the process load data? How would you study possible I/O issues?
4. Can you improve data handling in the code?


## Exercise X: Bring your own code and issues

Study I/O patterns in your own code. How much time does your code spend
waiting for I/O? Is this a significant portion of the time? How can you
improve this?
