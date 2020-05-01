import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ToDoList from "./components/todo-list.component";
import CreateToDo from "./components/create-todo.component";
import EditToDo from "./components/edit-todo.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <a href="/" className="navbar-brand">Mern To-Do App</a>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">To Do List</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create">Create New Task</a>
              </li>
            </ul>
          </nav>
          {/* this is how we connect the path with each function */}
          <Route path="/" exact component={ToDoList} />
          <Route path="/edit/:id" component={EditToDo} />
          <Route path="/create" component={CreateToDo} />
        </div>
      </Router >
    )
  }
}

export default App;
