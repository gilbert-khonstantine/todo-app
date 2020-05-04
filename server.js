const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const toDoRouter = express.Router()

const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(bodyParser.json());

// var mongoDB = 'mongodb://localhost/toDoList';
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully in either" + process.env.MONGODB_URI);
})


let toDoList = require('./models/todo.model');

toDoRouter.route('/api/todos').get((req, res) => {
    toDoList.find((err, todos) => {
        res.json(todos);
    })
});

toDoRouter.route('/api/todos/:id').get((req, res) => {
    toDoList.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).json("ID does not exist!");
        }
        else {
            res.json(todo);
        }
    })
})

toDoRouter.route('/api/add').post((req, res) => {
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

toDoRouter.route('/api/update/:id').post((req, res) => {
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

toDoRouter.route('/api/remove/:id').delete((req, res) => {
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", toDoRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('mern-todo-app/build/'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'mern-todo-app', 'build', 'index.html')); // relative path
    });
}

const proxy = require('http-proxy-middleware');


app.listen(PORT, () => {
    console.log('Server is listening on: ' + PORT)
})

module.exports = function (app) {
    app.use(proxy(['/api']), { target: 'http://localhost:8080' })
}