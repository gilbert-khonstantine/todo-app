import React, { Component } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";

function ToDo(props) {
    function onDelete(e) {
        e.preventDefault();
        axios.delete("http://localhost:4000/remove/" + props.todo._id)
    }
    return (<tr>
        <td className={props.todo.completed ? 'completed' : ""}>{props.todo.taskName}</td>
        <td className={props.todo.completed ? 'completed' : ""}>{props.todo.description}</td>
        <td className={props.todo.completed ? 'completed' : ""}>{props.todo.deadline}</td>
        <td className={props.todo.completed ? 'completed' : ""}>{props.todo.priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
            &emsp;
            <a onClick={onDelete} href={"/"}>Remove</a>
        </td>
    </tr>)
}

export default class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then((res) => {
                this.setState({ todos: res.data })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/')
            .then((res) => {
                this.setState({ todos: res.data })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getToDoList() {
        return this.state.todos.map(function (currentToDo, i) {
            return <ToDo todo={currentToDo} key={i} />
        })
    }

    render() {
        return (
            <div>
                <h2> To Do List </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getToDoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
