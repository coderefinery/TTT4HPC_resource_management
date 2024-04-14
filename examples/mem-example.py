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
