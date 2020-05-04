import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ToDoList from "./components/todo-list.component";
import CreateToDo from "./components/create-todo.component";
import EditToDo from "./components/edit-todo.component";
import Dashboard from './components/dashboard.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <Link to="/dashboard" className="navbar-brand">Mern To-Do App</Link>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">To Do List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create New Task</Link>
              </li>
            </ul>
          </nav>
          {/* this is how we connect the path with each function */}
          <Route path="/" exact component={ToDoList} />
          <Route path="/edit/:id" component={EditToDo} />
          <Route path="/create" component={CreateToDo} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router >
    )
  }
}

export default App;
