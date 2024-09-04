# Solidity Contract

THE ACTUAL CONTRACT IS DEPLOYED ON SEPOLIA ETHER BLOCKCHAIN at [this link](https://sepolia.etherscan.io/address/0xeF32811A7a295478e56f4c906BF6C4B38D7941cf) by [thirdweb](https://thirdweb.com/dashboard) ; but it still needs sufficient sepolia ether to run it for demonstration purposes so we run it locally. It's source code can also be seen on the internet at https://sepolia.etherscan.io/address/0xeF32811A7a295478e56f4c906BF6C4B38D7941cf#code.

## Deploying Contracts

When you're ready to deploy your contracts, just run one of the following command to deploy you're contracts:

```bash
npm run deploy
# or
yarn deploy
```

## Releasing Contracts

If you want to release a version of your contracts publicly, you can use one of the followings command:

```bash
npm run release
# or
yarn release
```

### Sorting Algorithms and Allocation Algorithm in the Overtime Smart Contract

**1. Task Sorting Algorithm:**

The task sorting algorithm is designed to prioritize tasks that are ready to be assigned to workers. It follows a multi-criteria sorting approach:

- **Step 1: Filtering Tasks**
  - The algorithm begins by filtering out tasks that are either completed or not ready for assignment. A task is considered "ready" if it has no pending dependencies and its deadline has not yet passed.

- **Step 2: Sorting Tasks**
  - **Primary Criterion:** Tasks are first sorted based on the number of dependencies they have (`dependsOn`), in decreasing order. This ensures that tasks which are bottlenecked by other tasks are prioritized, as completing them may unlock other dependent tasks.
  - **Secondary Criterion:** If two tasks have the same number of dependencies, they are then sorted by their deadline, in increasing order. This prioritizes tasks that are closer to their deadline, ensuring timely completion.
  - **Tertiary Criterion:** If both the number of dependencies and deadlines are the same, tasks are sorted by the wage offered, in decreasing order. Higher-paying tasks are prioritized to incentivize workers.
  - **Quaternary Criterion:** Finally, if the previous criteria are identical, tasks are sorted by the required expertise level, in decreasing order. This ensures that more complex tasks are given priority when allocating skilled workers.

The sorting is implemented using an insertion sort algorithm, which is efficient given the relatively small number of tasks in typical use cases.

**2. Worker Sorting Algorithm:**

The worker sorting algorithm is designed to prioritize workers for task allocation based on their suitability for available tasks:

- **Step 1: Filtering Workers**
  - The algorithm starts by filtering out workers who are already assigned to a task. Only unallocated workers are considered for new task assignments.

- **Step 2: Calculating `z` Value**
  - Each worker is evaluated using a calculated value `z`, which is determined by:
    - **Hours Worked:** Workers with more hours worked are slightly deprioritized to balance the workload.
    - **Hours Available:** Workers with more hours available are prioritized, as they can take on more work.
    - **Minimum Wage:** Workers with a lower minimum wage are favored, as they are more cost-effective.
    - **Expertise Level:** Workers with higher expertise are prioritized for complex tasks.

  The `z` value is a composite score balancing these factors, ensuring that the best-suited worker is selected for a task.

- **Step 3: Sorting Workers**
  - Workers are sorted by their `z` value in increasing order. This ensures that the most suitable and cost-effective workers are prioritized for task allocation.

The sorting is also performed using an insertion sort algorithm, tailored for the relatively small number of workers involved.

**3. Task Allocation Algorithm:**

The task allocation algorithm assigns sorted tasks to sorted workers, ensuring that tasks are completed efficiently:

- **Step 1: Freeing Workers**
  - Before allocating new tasks, the algorithm checks if any currently allocated workers have completed their tasks. These workers are then marked as free and available for new tasks.

- **Step 2: Assigning Tasks**
  - The algorithm iterates through the sorted list of tasks and workers. For each task, it attempts to allocate it to the most suitable worker based on the sorted order.
  - **Divisible Tasks:** If a task is divisible (can be worked on by multiple workers), it allocates available hours from multiple workers until the task's required time is fulfilled.
  - **Non-Divisible Tasks:** For non-divisible tasks, the algorithm looks for a single worker who can fully complete the task based on their available hours and expertise level.

- **Step 3: Updating Task and Worker States**
  - Once a worker is allocated a task, the algorithm updates the worker's hours, marks the task as in progress, and, if necessary, updates the task's dependencies.

- **Step 4: Handling Completed Tasks**
  - If a task is completed (i.e., its required time reaches zero and no workers are still working on it), the task is marked as completed, and any dependent tasks are updated to reflect the reduced dependency.

This allocation algorithm ensures that tasks are assigned to workers in a way that maximizes efficiency, prioritizing critical tasks and matching them with the most suitable workers.
