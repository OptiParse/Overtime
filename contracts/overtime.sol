// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Overtime {

    address public admin;
    constructor() {
        admin = msg.sender;
    }
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    struct Worker {
        uint256 hoursAvailable;
        uint256 expertiseLevel;
        uint256 minWage;
        address wallet;
        uint256 totalWage;
        uint256 taskID; //nil means unallocated
    }

    Worker[] public workers;
    mapping(address => uint256) Indx; //taskID to Indx

    uint256 workerIDs = 0; // number of workers
    uint256 constant nil = 1000000000000000; // using constant for unallocated value

    function registerWorker(uint256 _hoursAvailable, uint256 _expertiseLevel, uint256 _minWage) external {
        workers.push(Worker({
            hoursAvailable: _hoursAvailable,
            expertiseLevel: _expertiseLevel,
            minWage: _minWage,
            wallet: msg.sender,
            totalWage: 0,
            taskID: nil
        }));
        Indx[msg.sender] = workerIDs;
        workerIDs++;
    }

    struct Task {
        uint256 taskID;
        uint256 timeRequired;
        uint256 expertiseLevel;
        uint256[] task_dependencies; // tasks on which this task depends
        uint depends_on; // number of dependencies
        uint256 wage;
        uint256 deadline;
        bool divisible;
        uint256 workerID; // nil means unallocated
        bool completed;
        bool inProgress; // Indicates if the task is in progress
        uint256 workDone; // Tracks hours of work done on the task
        uint256[] workersOnTask; //  (if divisible) Tracks worker IDs working on this task
    }

    Task[] public tasks;
    uint256 TaskIndx = 0;
    function addTask(
        uint256 _taskID,
        uint256 _timeRequired, 
        uint256 _expertiseLevel, 
        uint256[] calldata _dependencies, // array of task IDs this task depends on
        uint256 _wage, 
        uint256 _deadline, 
        bool _divisible
    ) external onlyAdmin {
        //code to update task_dependencies of previous tasks for this one
        uint256 remaining_tasks = _dependencies.length;
        for(uint256 i = 0; i < _dependencies.length ; i++){
            if(tasks[ _dependencies[i] ].completed) remaining_tasks--; 
            else{
                tasks[ _dependencies[i] ].task_dependencies.push(_taskID);
            }
        }

        uint256[] memory emptyarr;
        uint256[] memory emptyarr2;
        tasks.push(Task({
            taskID : _taskID,
            timeRequired: _timeRequired,
            expertiseLevel: _expertiseLevel,
            task_dependencies : emptyarr , // initializing an empty array
            depends_on : remaining_tasks, // setting the number of dependencies
            wage: _wage,
            deadline: _deadline,
            divisible: _divisible,
            workerID: nil,
            completed: false,
            inProgress: false,
            workDone: 0,
            workersOnTask : emptyarr2
        }));
        TaskIndx++;
    }

    // Function to sort tasks
    function sortTasks() private view returns (uint256[] memory) {
        uint256 taskCount = tasks.length;
        uint256[] memory uncompletedTaskIDs = new uint256[](taskCount);
        uint256 count = 0;

        // Step 1: Filter out completed tasks
        for (uint256 i = 0; i < taskCount; i++) {
            if (!tasks[i].completed) {
                uncompletedTaskIDs[count] = tasks[i].taskID;
                count++;
            }
        }

        // Resize the array to only contain uncompleted tasks
        uint256[] memory sortedTaskIDs = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            sortedTaskIDs[i] = uncompletedTaskIDs[i];
        }

        // Step 2: Sort by `depends_on` (decreasing), `deadline` (increasing), `wage` (decreasing), and `expertiseLevel` (decreasing)
        for (uint256 i = 1; i < count; i++) {
            uint256 key = sortedTaskIDs[i];
            uint256 j = i - 1;

            // Perform insertion sort
            while (j >= 0 && (
                // First criterion: compare by depends_on in decreasing order
                (tasks[sortedTaskIDs[j]].depends_on < tasks[key].depends_on) ||
                // Second criterion: if depends_on is equal, compare by deadline in increasing order
                (tasks[sortedTaskIDs[j]].depends_on == tasks[key].depends_on && tasks[sortedTaskIDs[j]].deadline > tasks[key].deadline) ||
                // Third criterion: if both depends_on and deadline are equal, compare by wage in decreasing order
                (tasks[sortedTaskIDs[j]].depends_on == tasks[key].depends_on && 
                 tasks[sortedTaskIDs[j]].deadline == tasks[key].deadline && 
                 tasks[sortedTaskIDs[j]].wage < tasks[key].wage) ||
                // Fourth criterion: if depends_on, deadline, and wage are equal, compare by expertiseLevel in decreasing order
                (tasks[sortedTaskIDs[j]].depends_on == tasks[key].depends_on && 
                 tasks[sortedTaskIDs[j]].deadline == tasks[key].deadline && 
                 tasks[sortedTaskIDs[j]].wage == tasks[key].wage && 
                 tasks[sortedTaskIDs[j]].expertiseLevel < tasks[key].expertiseLevel)
            )) {
                sortedTaskIDs[j + 1] = sortedTaskIDs[j];
                if (j == 0) {
                    break;
                }
                j--;
            }
            sortedTaskIDs[j + 1] = key;
        }

        return sortedTaskIDs;
    }

    // Function to sort workers
    function sortWorkers() private view returns (uint256[] memory) {
        uint256 workerCount = workers.length;
        uint256[] memory unallocatedWorkerIDs = new uint256[](workerCount);
        uint256 count = 0;

        // Step 1: Filter out workers who are already allocated to a task (taskID != nil)
        for (uint256 i = 0; i < workerCount; i++) {
            if (workers[i].taskID == nil) {
                unallocatedWorkerIDs[count] = i;  // Store worker index
                count++;
            }
        }

        // Resize the array to only contain unallocated workers
        uint256[] memory sortedWorkerIDs = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            sortedWorkerIDs[i] = unallocatedWorkerIDs[i];
        }

        // Step 2: Sort by `expertiseLevel` (increasing) and `hoursAvailable` (increasing)
        for (uint256 i = 1; i < count; i++) {
            uint256 key = sortedWorkerIDs[i];
            uint256 j = i - 1;

            // Perform insertion sort
            while (j >= 0 && (
                // First criterion: compare by expertiseLevel in increasing order
                (workers[sortedWorkerIDs[j]].expertiseLevel > workers[key].expertiseLevel) ||
                // Second criterion: if expertiseLevel is equal, compare by hoursAvailable in increasing order
                (workers[sortedWorkerIDs[j]].expertiseLevel == workers[key].expertiseLevel && 
                 workers[sortedWorkerIDs[j]].hoursAvailable > workers[key].hoursAvailable)
            )) {
                sortedWorkerIDs[j + 1] = sortedWorkerIDs[j];
                if (j == 0) {
                    break;
                }
                j--;
            }
            sortedWorkerIDs[j + 1] = key;
        }

        return sortedWorkerIDs;
    }
    
    function payWorker(uint256 workerId, uint256 amount) internal {
        address workerWallet = workers[workerId].wallet;
        // require(address(this).balance >= amount, "Insufficient funds in contract");
        workers[workerId].totalWage += amount;
        // payable(workerWallet).transfer(amount); // we can similarly use the real ethers as well
        // emit PaymentProcessed(workerId, amount);
    }

    function allocateTaskToWorker(uint256 taskId, uint256 workerId) internal {
        workers[workerId].taskID = taskId;
        tasks[taskId].workerID = workerId;
        workers[workerId].hoursAvailable -= tasks[taskId].timeRequired;
    }

    function markTaskAsCompleted(uint256 taskId) internal {
        tasks[taskId].completed = true;
        uint256 workerId = tasks[taskId].workerID;
        workers[workerId].taskID = nil;
        payWorker(workerId, tasks[taskId].wage);
    }

    function allocateTasks() external onlyAdmin {
        uint256[] memory sortedTaskIDs = sortTasks();
        uint256[] memory sortedWorkerIDs = sortWorkers();

        for (uint256 i = 0; i < sortedTaskIDs.length; i++) {
            uint256 taskId = sortedTaskIDs[i];
            bool taskAssigned = false;

            for (uint256 j = 0; j < sortedWorkerIDs.length; j++) {
                uint256 workerId = sortedWorkerIDs[j];

                if (workers[workerId].expertiseLevel >= tasks[taskId].expertiseLevel) {
                    if (tasks[taskId].divisible) {
                        uint256 hoursAllocated = (workers[workerId].hoursAvailable > tasks[taskId].timeRequired)?(tasks[taskId].timeRequired):(workers[workerId].hoursAvailable);
                        tasks[taskId].timeRequired -= hoursAllocated;
                        workers[workerId].hoursAvailable -= hoursAllocated;

                        if (tasks[taskId].timeRequired == 0) {
                            tasks[taskId].workerID = workerId;
                            taskAssigned = true;
                            break;
                        }
                    } else {
                        if (workers[workerId].hoursAvailable >= tasks[taskId].timeRequired) {
                            tasks[taskId].workerID = workerId;
                            workers[workerId].hoursAvailable -= tasks[taskId].timeRequired;
                            taskAssigned = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    function checkStatus() external view onlyAdmin returns (Task[] memory) {
        uint256 taskCount = tasks.length;
        Task[] memory taskStatusList = new Task[](taskCount);

        for (uint256 i = 0; i < taskCount; i++) {
            taskStatusList[i] = tasks[i];
        }
        return taskStatusList;
    }  

    function checkWallet() public returns (uint256) { //returns amount of wage earned by worker through the contract
        uint256 WorkerID = Indx[msg.sender];
        if(WorkerID > 0){
            return workers[WorkerID].totalWage;
        }
        return 0;
    }    
}
