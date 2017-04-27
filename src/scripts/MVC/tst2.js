/*
  event dispatcher
*/

let Event = sender => {
  console.log(sender);

  this.__sender = sender;
  this.__listeners = [];
}

Event.prototype = {

  attach: function (listener) {
    this.__listeners.push(listener)

    console.log("listeners", this.__listeners);
  },

  notify: function (args) {
    for (let i = 0; i < this.__listeners.lenght; i++){
      this.__listeners[i](this.__sender, args)
    }

     console.log("notufy", args);
  }
}; 
//Event("estamoes en la A");

/*
  task model
*/

let TaskModel = () => {
  this.task = [];
  this.selectedTasks = [];
  this.addTaskEvent = new Event(this);
  this.removeTaskEvent = new Event(this);
  this.setTasksAsCompletedEvent = new Event(this);
};

Task.prototype = {
  addTask: function (task){
    this.task.push({
      taskName: task,
      taskStatus: 'umcompleted'
    });

    this.addTaskEvent.notify();
  },

  getTasks: function () {
    return this.tasks;
  },

  unselectTask: function (taskIndex) {
    this.selectedTasks.splice(taskIndex, 1);
  },

  setTasksAsCompleted: function () {
    var selectedTasks = this.selectedTasks;
    for (let index in selectedTasks){
      this.task[selectedTasks[index]].taskStatus = 'completed';
    }

    this.setTasksAsCompletedEvent.notify();

    this.selectedTasks = [];

  },

  deleteTasks: function () {
    let selectedTasks = this.selectedTasks.sort();

    for (let i = selectedTasks.length-1; i >= 0; i--){
      this.tasks.splice(this.selectedTasks[i], 1);
    }

    this.selectedTasks = [];

    this.deleteTasksEvent.notify();
  }
}

/*
  tasks view
*/

let TaskView = function (model) {
  this.model = model;
  this.addTaskEvent = new Event(this);
  this.selectTaskEvent = new Event(this);
  this.unselecteTaskEvent = new Event(this);
  this.deleteTaskEvent = new Event(this);

  this.init();
} 

TaskView.prototype = {
  init: function () {
    this.createChildren()
      .setupHandlers()
      .enable();
  },

  setupHandlers: function () {
    this.addTaskButtonHandler = this.addTaskButton.bind(this);
    this.selectOrUnselectTaskHandler = this.selectOrUnselectTask.bind(this);
    this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
    this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);

    // handlers for event dispatcher
    this.addTaslHnadler = this.addTask.bind(this);
    this.clearTaskTextBoxHandler = this.clearTaskTextBoxHandler.bind(this);
    this.setTasksAsCompletedHandler = this.setTasksAsCompleted.bind(this);
    this.deleteTasksHandler = this.deleteTasks.bind(this);

    return this;
  },

  enable: function () {
    
  }

}


















