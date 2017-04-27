"use strict";

/*
  event dispatcher
*/

var Event = function Event(sender) {
  console.log(sender);

  undefined.__sender = sender;
  undefined.__listeners = [];
};

Event.prototype = {

  attach: function attach(listener) {
    this.__listeners.push(listener);

    console.log("listeners", this.__listeners);
  },

  notify: function notify(args) {
    for (var i = 0; i < this.__listeners.lenght; i++) {
      this.__listeners[i](this.__sender, args);
    }

    console.log("notufy", args);
  }
};
//Event("estamoes en la A");

/*
  task model
*/

var TaskModel = function TaskModel() {
  undefined.task = [];
  undefined.selectedTasks = [];
  undefined.addTaskEvent = new Event(undefined);
  undefined.removeTaskEvent = new Event(undefined);
  undefined.setTasksAsCompletedEvent = new Event(undefined);
};

Task.prototype = {
  addTask: function addTask(task) {
    this.task.push({
      taskName: task,
      taskStatus: 'umcompleted'
    });

    this.addTaskEvent.notify();
  },

  getTasks: function getTasks() {
    return this.tasks;
  },

  unselectTask: function unselectTask(taskIndex) {
    this.selectedTasks.splice(taskIndex, 1);
  },

  setTasksAsCompleted: function setTasksAsCompleted() {
    var selectedTasks = this.selectedTasks;
    for (var index in selectedTasks) {
      this.task[selectedTasks[index]].taskStatus = 'completed';
    }

    this.setTasksAsCompletedEvent.notify();

    this.selectedTasks = [];
  },

  deleteTasks: function deleteTasks() {
    var selectedTasks = this.selectedTasks.sort();

    for (var i = selectedTasks.length - 1; i >= 0; i--) {
      this.tasks.splice(this.selectedTasks[i], 1);
    }

    this.selectedTasks = [];

    this.deleteTasksEvent.notify();
  }
};

/*
  tasks view
*/

var TaskView = function TaskView(model) {
  this.model = model;
  this.addTaskEvent = new Event(this);
  this.selectTaskEvent = new Event(this);
  this.unselecteTaskEvent = new Event(this);
  this.deleteTaskEvent = new Event(this);

  this.init();
};

TaskView.prototype = {
  init: function init() {
    this.createChildren().setupHandlers().enable();
  },

  setupHandlers: function setupHandlers() {
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

  enable: function enable() {}

};