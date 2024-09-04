# Overtime

Takneek 2024 PS (overtime) solved by Hall 3

## Installation

To install the Overtime project, follow these steps:

```bash
$ git clone https://github.com/OptiParse/Overtime.git
$ cd Overtime
$ npm install
$ npm run dev
```


### Overtime Smart Contract Documentation

**Overview:**
The `Overtime` smart contract manages and allocates tasks among registered workers based on their availability, expertise, and wage expectations. It supports both divisible and non-divisible tasks, making it suitable for scenarios where tasks need to be distributed among multiple workers with varying expertise levels.

**Key Components:**

1. **Admin and Access Control:**
   - The contract is initialized with an admin (the address that deploys the contract).
   - Certain functions are restricted to the admin using the `onlyAdmin` modifier.

2. **Worker Management:**
   - Workers can register with their available hours, expertise level, and minimum wage.
   - Workers are stored in a `Worker` struct, which includes details such as hours available, hours worked, task ID, and total wage earned.
   - The `registerWorker` function adds new workers and triggers task allocation if the number of workers reaches a predefined batch size.

3. **Task Management:**
   - Tasks are added by the admin through the `addTask` function, specifying details like the required time, expertise level, dependencies, wage, deadline, and whether the task is divisible.
   - Tasks are stored in a `Task` struct, which includes details such as task ID, required time, wage, deadline, and dependencies.

4. **Task Allocation:**
   - Tasks are allocated to workers based on their availability, expertise level, and wage expectations.
   - Tasks are sorted and allocated using the `allocateTasks` function, which also frees up workers who have completed their tasks.
   - The sorting of tasks and workers is done through the `sortTasks` and `sortWorkers` functions, respectively, using criteria such as dependencies, deadline, wage, and expertise level.

5. **Task and Worker Sorting:**
   - Tasks are sorted by the number of dependencies, deadline, wage, and expertise level to prioritize which tasks should be assigned first.
   - Workers are sorted by a calculated value `z`, which factors in hours worked, hours available, minimum wage, and expertise level, to determine the best fit for a task.

6. **Payment and Wage Management:**
   - Workers are paid based on the hours worked and the wage associated with the task.
   - Payments are managed internally, and workers can check their earned wage using the `checkWallet` function.

7. **Status Checking:**
   - The admin can check the status of all tasks using the `checkStatus` and `checkStatus2` functions. These functions provide a view of the current state of tasks, including which tasks are in progress and which are completed.

**Usage:**

- **Admin Operations:**
  - Add tasks with specific requirements and manage the allocation process.
  - Monitor the progress and status of tasks and workers.

- **Worker Operations:**
  - Register as a worker to receive task allocations.
  - Check the total wage earned from completed tasks.

**Considerations:**
- The contract uses a simulation factor for testing purposes, which speeds up time-based operations. This can be adjusted for real-time implementations.
- The contract includes mechanisms to handle tasks with dependencies and ensures that workers are allocated tasks that match their expertise and wage requirements.

**Constants:**
- `simulationFactor`: Adjusts the speed at which time moves for testing purposes.
- `taskBatchSize` and `workerBatchSize`: Define batch sizes for task and worker allocation, respectively.
- `nil`: A constant used to indicate an unallocated task for a worker.

## Project Structure

The project is organized as follows:

- `main.jsx`: The entry point of the application, which renders the root component.
- `assets/`: Directory containing static assets like CSS files.
- `pages/`: Contains the main components/pages of the application.
  - `AdminDashboard.jsx`: The admin dashboard page.
  - `CompletedTasks.jsx`: Displays tasks that have been completed.
  - `UserPage.jsx`: The user dashboard page.
  - `OngoingTasks.jsx`: Displays tasks that are currently ongoing.
  - `UnassignedTasks.jsx`: Displays tasks that have not been assigned yet.
  - `AllTasks.jsx`: Displays all tasks (note: this currently imports the CompletedTasks component, which may be intentional or a mistake to be reviewed).
  - `Logout.jsx`: Handles the logout process.
  - `Register.jsx`: Registration page for new users.