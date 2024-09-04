// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Overtime {
    uint256 simulationFactor = 60; // 3600 * outGame/inGame rates ... (speed at which time moves : for testing purposes). real-time implementation at 3600.
    uint256 taskBatchSize = 5; //modify as per more information about dataset
    uint256 workerBatchSize = 1; //modify as per more information about dataset

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
        uint256 hoursWorked;
        uint256 taskHours;
        uint256 expertiseLevel;
        uint256 minWage;
        address wallet;
        uint256 totalWage;
        uint256 taskID; //nil means unallocated
        uint256 startTime;
    }

    Worker[] public workers;
    mapping(address => uint256) Indx; //taskID to Indx

    uint256 totalWorkers = 0; // number of workers
    uint256 availableWorkers = 0;
    uint256 constant nil = 1000000000000000; // using constant for unallocated value

    function registerWorker(uint256 _hoursAvailable, uint256 _expertiseLevel, uint256 _minWage) external {
        workers.push(Worker({
            hoursAvailable: _hoursAvailable,
            hoursWorked: 0,
            taskHours: 0,
            expertiseLevel: _expertiseLevel,
            minWage: _minWage,
            wallet: msg.sender,
            totalWage: 0,
            taskID: nil,
            startTime: 0
        }));
        Indx[msg.sender] = totalWorkers;
        totalWorkers++;
        availableWorkers++;
        if(totalWorkers % workerBatchSize == 0){
            allocateTasks();
        }
    }

    struct Task {
        uint256 taskID;
        uint256 totalTime; 
        uint256 timeRequired; //time excluding what is already done
        uint256 expertiseLevel;
        uint256[] taskDependencies; // tasks on which this task depends
        uint dependsOn; // number of dependencies
        uint256 wage;
        uint256 deadline;
        uint256 timeAssigned; //time of blockchain
        bool divisible;
        bool completed; //indicates if complete
        uint256 inProgress; // Number of people working on this task
        uint256[] workersOnTask; //  (if divisible) Tracks worker IDs working on this task
    }

    Task[] public tasks;
    uint256 totalTasks = 0;

    function addTask(
        uint256 _taskID,
        uint256 _timeRequired, //must be >= 1 -> do on JavaScript
        uint256 _expertiseLevel, 
        uint256[] calldata _dependencies, // array of task IDs this task depends on
        uint256 _wage, 
        uint256 _deadline, 
        bool _divisible
    ) external onlyAdmin {
        //code to update taskDependencies of previous tasks for this one
        uint256 remaining_tasks = _dependencies.length;
        for(uint256 i = 0; i < _dependencies.length ; i++){
            if(tasks[_dependencies[i]].completed) remaining_tasks--; 
            else{
                tasks[_dependencies[i]].taskDependencies.push(_taskID);
            }
        }

        uint256[] memory emptyarr;
        uint256[] memory emptyarr2;
        tasks.push(Task({
            taskID : _taskID,
            totalTime: _timeRequired,
            timeRequired: _timeRequired,
            expertiseLevel: _expertiseLevel,
            taskDependencies : emptyarr , // initializing an empty array
            dependsOn : remaining_tasks, // setting the number of dependencies
            wage: _wage,
            deadline: _deadline,
            timeAssigned: block.timestamp,
            divisible: _divisible,
            completed: false,
            inProgress: 0,
            workersOnTask : emptyarr2
        }));
        totalTasks++;
        if(totalTasks % taskBatchSize == 0){
            allocateTasks();
        }
    }

    // Function to sort tasks
    function sortTasks() internal view returns (uint256[] memory) {
        uint256 taskCount = tasks.length;
        uint256[] memory uncompletedTaskIDs = new uint256[](taskCount);
        uint256 count = 0;

        // Step 1: Filter out completed tasks
        for (uint256 i = 0; i < taskCount; i++) {
            if((!tasks[i].completed) && (block.timestamp - tasks[i].timeAssigned > tasks[i].deadline) && (tasks[i].dependsOn == 0)){
                uncompletedTaskIDs[count] = tasks[i].taskID;
                count++;
            }
        }

        // Resize the array to only contain uncompleted tasks
        uint256[] memory sortedTaskIDs = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            sortedTaskIDs[i] = uncompletedTaskIDs[i];
        }

        // Step 2: Sort by `dependsOn` (decreasing), `deadline` (increasing), `wage` (decreasing), and `expertiseLevel` (decreasing)
        for (uint256 i = 1; i < count; i++) {
            uint256 key = sortedTaskIDs[i];
            uint256 j = i - 1;

            // Perform insertion sort
            while (j >= 0 && (
                // First criterion: compare by dependsOn in decreasing order
                (tasks[sortedTaskIDs[j]].dependsOn < tasks[key].dependsOn) ||
                // Second criterion: if dependsOn is equal, compare by deadline in increasing order
                (tasks[sortedTaskIDs[j]].dependsOn == tasks[key].dependsOn && tasks[sortedTaskIDs[j]].deadline > tasks[key].deadline) ||
                // Third criterion: if both dependsOn and deadline are equal, compare by wage in decreasing order
                (tasks[sortedTaskIDs[j]].dependsOn == tasks[key].dependsOn && 
                 tasks[sortedTaskIDs[j]].deadline == tasks[key].deadline && 
                 tasks[sortedTaskIDs[j]].wage < tasks[key].wage) ||
                // Fourth criterion: if dependsOn, deadline, and wage are equal, compare by expertiseLevel in decreasing order
                (tasks[sortedTaskIDs[j]].dependsOn == tasks[key].dependsOn && 
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

    function freeWorkers() internal {
        for (uint256 i = 0; i < workers.length; i++) {
            if (workers[i].taskID != nil && block.timestamp >= workers[i].startTime + workers[i].taskHours * simulationFactor) {
                uint256 taskIDd = workers[i].taskID;
                payWorker(i, workers[i].taskHours * tasks[taskIDd].wage);
                workers[i].taskHours = 0;
                tasks[taskIDd].inProgress--;
                if((tasks[taskIDd].timeRequired == 0) && (tasks[taskIDd].inProgress == 0)){
                    tasks[taskIDd].completed = true;
                    uint256[] memory deps = tasks[taskIDd].taskDependencies;
                    for(uint j = 0; j < deps.length; j++){
                        tasks[deps[j]].dependsOn--;
                    }
                }
                workers[i].taskID = nil;
            }
        }
    }

    // Function to sort workers
    function sortWorkers() internal view returns (uint256[] memory) {
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
    
    function payWorker(uint256 workerId, uint256 amount) internal { //function payable internal
        // address workerWallet = workers[workerId].wallet;
        // require(address(this).balance >= amount, "Insufficient funds in contract");
        workers[workerId].totalWage += amount;
        // payable(workerWallet).transfer(amount); // we can similarly use the real ethers as well
        // emit PaymentProcessed(workerId, amount);
    }

    function allocateTasks() internal {
        freeWorkers();
        uint256[] memory sortedWorkerIDs = sortWorkers();
        uint256[] memory sortedTaskIDs = sortTasks();

        for (uint256 i = 0; i < sortedTaskIDs.length; i++) {
            uint256 taskId = sortedTaskIDs[i];

            for (uint256 j = 0; j < sortedWorkerIDs.length; j++) {
                uint256 workerId = sortedWorkerIDs[j];
                if ((workers[workerId].taskID == nil)&&(workers[workerId].expertiseLevel >= tasks[taskId].expertiseLevel)&&(workers[workerId].minWage <= tasks[taskId].wage)){
                    if (tasks[taskId].divisible) {
                        uint256 hoursAllocated = (workers[workerId].hoursAvailable > tasks[taskId].timeRequired)?(tasks[taskId].timeRequired):(workers[workerId].hoursAvailable);
                        tasks[taskId].timeRequired -= hoursAllocated;
                        tasks[taskId].workersOnTask.push(workerId);
                        tasks[taskId].inProgress++;

                        workers[workerId].hoursAvailable -= hoursAllocated;
                        workers[workerId].hoursWorked += hoursAllocated;
                        workers[workerId].taskHours = hoursAllocated;
                        workers[workerId].taskID = taskId;
                        workers[workerId].startTime = block.timestamp;                   

                        if (tasks[taskId].timeRequired == 0) {
                            break;
                        }
                    }
                    else {
                        if (workers[workerId].hoursAvailable >= tasks[taskId].timeRequired) {
                            tasks[taskId].workersOnTask.push(workerId);
                            tasks[taskId].timeRequired = 0;
                            tasks[taskId].inProgress++;
                            
                            workers[workerId].hoursAvailable -= tasks[taskId].timeRequired;
                            workers[workerId].hoursWorked += tasks[taskId].timeRequired;
                            workers[workerId].taskHours = tasks[taskId].timeRequired;
                            workers[workerId].taskID = taskId;
                            workers[workerId].startTime = block.timestamp;
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

    function checkStatus2() external onlyAdmin returns (Task[] memory) {
        allocateTasks();

        uint256 taskCount = tasks.length;
        Task[] memory taskStatusList = new Task[](taskCount);

        for (uint256 i = 0; i < taskCount; i++) {
            taskStatusList[i] = tasks[i];
        }
        return taskStatusList;
    }  

    function checkWallet() public view returns (uint256) {
        // Check if the sender is a registered worker , and returns the amount they earned through this contract
        if((workers.length > 0) && (Indx[msg.sender] < totalWorkers) && (workers[Indx[msg.sender]].wallet == msg.sender)){
            uint256 WorkerID = Indx[msg.sender];
            return workers[WorkerID].totalWage;
        }
        return 0;
    }
}
