const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Todo = new Schema({
    taskName: {
        type: String
    },
    deadline: {
        type: String
    },
    description: {
        type: String
    },
    priority: {
        type: String
    },
    completed: {
        type: Boolean
    }

});

module.exports = mongoose.model('toDoList', Todo)