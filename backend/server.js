const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const toDoRouter = express.Router()

const PORT = 4000;
app.use(cors());

app.use(bodyParser.json());

var mongoDB = 'mongodb://127.0.0.1:27017/toDoList';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


let toDoList = require('./todo.model');

toDoRouter.route('/').get((req, res) => {
    toDoList.find((err, todos) => {
        res.json(todos);
    })
});

toDoRouter.route('/:id').get((req, res) => {
    toDoList.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).json("ID does not exist!");
        }
        else {
            res.json(todo);
        }
    })
})

toDoRouter.route('/add').post((req, res) => {
    let todo = new toDoList(req.body);
    console.log(todo);
    todo.save()
        .then(todo => {
            res.status(200).json({ "todo": "Task Added Successfully" })
        })
        .catch(todo => {
            res.status(500).json({ 'todo': 'Unable to add task :(' })
        })
})

toDoRouter.route('/update/:id').post((req, res) => {
    let id = req.params.id;
    toDoList.findById(id, (err, todo) => {
        if (!todo) {
            res.status(404).send("Id does not exist")
        }
        else {
            todo.taskName = req.body.taskName;
            todo.deadline = req.body.deadline;
            todo.description = req.body.description;
            todo.priority = req.body.priority;
            todo.completed = req.body.completed;
            todo.save().then(res => {
                res.json('Task Updated');
            })
                .catch(err => {
                    res.send("Unable to update task!")
                })


        }
    })
})

toDoRouter.route('/remove/:id').delete((req, res) => {
    let id = req.params.id;
    toDoList.findById(id, (err, todo) => {
        if (!todo) {
            res.status(404).send("Id does not exist")
        }
        else {
            todo.remove().then(res => {
                res.json('Task Removed');
            })
                .catch(err => {
                    res.json(err)
                })


        }
    })
})

app.use("/", toDoRouter)


app.listen(PORT, () => {
    console.log('Server is listening on: ' + PORT)
})
