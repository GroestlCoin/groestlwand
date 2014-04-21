'use strict';

var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var Tip = mongoose.model('Tip');

var models = {
  Tip: Tip,
  Account: Account
};

var queue = [];


exports.pushCommand = function (model, method, args) {
  var command = {
    model: model, // String
    method: method, // String
    args: args // Array
  };

  queue.push(command); // Add command to back of queue
};


var worker = function () {
  function callback (err) {
    // console.log(Date.now(), 'WORKER CALLBACK', err)
    if (err) { // For bad, unexpected errors, log it and crash. (Expected errors are saved to db inside the method)
      console.error(err);
      process.exit();
    }

    worker();
  }

  setTimeout(function () {
    if (queue.length) { // If there are commands in the queue
      // console.log(Date.now(), 'QUEUE', queue)
      var command = queue.shift(); // Take command off front of queue
      command.args.push(callback); // Add callback
      return models[command.model][command.method].apply(models[command.model], command.args); // Run command
    }

    return worker();
  }, 100);
};


worker();