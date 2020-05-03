import React, { Component } from 'react'
import axios from 'axios'

export default class EditToDo extends Component {
    constructor(props) {
        super(props);

        this.OnChangeName = this.OnChangeName.bind(this);
        this.OnChangeDeadline = this.OnChangeDeadline.bind(this);
        this.OnChangePriority = this.OnChangePriority.bind(this);
        this.OnChangeDescription = this.OnChangeDescription.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            taskName: "",
            deadline: "",
            description: "",
            priority: "",
            completed: false,
        };
    }

    OnChangeName(event) {
        this.setState({
            taskName: event.target.value
        });
    }

    OnChangePriority(event) {
        this.setState({
            priority: event.target.value
        });
    }
    OnChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }
    OnChangeDeadline(event) {
        this.setState({
            deadline: event.target.value
        })
    }

    onChangeTodoCompleted(event) {
        console.log(this.state)
        this.setState({
            completed: !this.state.completed
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.taskName}`);
        console.log(`Todo Desc: ${this.state.description}`);
        console.log(`Todo Deadline: ${this.state.deadline}`);
        console.log(`Todo Priority: ${this.state.priority}`);
        console.log(`Todo completed: ${this.state.completed}`);

        axios.post('http://localhost:4000/update/' + this.props.match.params.id, this.state)
            .then((res) => {
                console.log("POST Request Update sent!")
            })
            .catch((err) => {
                console.log(err);
            });
        this.props.history.push('/');
    }

    componentDidMount() {
        axios.get('http://localhost:4000/' + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    taskName: res.data.taskName,
                    deadline: res.data.deadline,
                    description: res.data.description,
                    priority: res.data.priority,
                    completed: res.data.completed
                })
                console.log(this.state)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <h2>Edit To Do List</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Task Name</label>
                        <input type="text" className="form-control" value={this.state.taskName} onChange={this.OnChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Deadline</label>
                        <input type="date" className=" form-control" value={this.state.deadline} onChange={this.OnChangeDeadline} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.OnChangeDescription} />
                    </div>
                    <div> Priority </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="high" name="priorityOptions" checked={this.state.priority === "high"} onChange={this.OnChangePriority} />
                        <label className="form-check-label">
                            High Piority
  </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="medium" name="priorityOptions" checked={this.state.priority === "medium"} onChange={this.OnChangePriority} />
                        <label className="form-check-label">
                            Medium Piority
  </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" value="low" name="priorityOptions" checked={this.state.priority === "low"} onChange={this.OnChangePriority} />
                        <label className="form-check-label">
                            Low Piority
  </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.completed}
                            value={this.state.completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>


                    <div>
                        <input type="submit" className="btn btn-primary" value="Update To Do" />
                    </div>
                </form>
            </div>
        );
    }
}