import React, { Component } from 'react';
import axios from 'axios';
import Histogram from 'react-chart-histogram';
import { getCurrentDate } from './utils'

//to get the number of days in a month
const getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
};

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
            //default month is this month.
            month: new Date(getCurrentDate()).getMonth() + 1,
            year: new Date(getCurrentDate()).getFullYear(),
            todos: [],
            taskFreq: []
        }
    }

    getData() {
        axios.get("/api/todos")
            .then((res) => {
                let selectedTodo = []
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].deadline.length > 0) {
                        if (new Date(res.data[i].deadline).getMonth() + 1 === parseInt(this.state.month)) {
                            selectedTodo.push(res.data[i])
                        }
                    }
                }
                this.setState({
                    todos: selectedTodo,
                })
                let taskFreq = []
                for (let i = 1; i <= getDaysInMonth(this.state.month, this.state.year); i++) {
                    let temp = 0
                    for (let j = 0; j < this.state.todos.length; j++) {
                        if (new Date(this.state.todos[j].deadline).getDate() === i) {
                            temp++;
                        }
                    }
                    taskFreq.push(temp);
                }
                this.setState({
                    taskFreq: taskFreq
                })
            })
    }

    //this is where the query works manually
    componentDidMount() {
        this.getData()
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getData()
    }

    onChangeMonth(event) {
        console.log(event.target.value)
        this.setState({
            month: new Date(event.target.value).getMonth() + 1,
            year: new Date(event.target.value).getFullYear()
        })

    }

    render() {
        // this is the days
        const days = [...Array(getDaysInMonth(this.state.month, this.state.year)).keys()].map(function (x) { return x + 1 });
        // this is the number of task daily
        const freq = this.state.taskFreq
        const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
        return (
            <div>
                <h3>Task Frequency Dashboard</h3>
                <div>
                    <h4> Month: </h4>
                    <form onSubmit={this.handleSubmit}>
                        <input type="month" onChange={this.onChangeMonth} value={this.state.year + "-" + (this.state.month < 10 ? "0" + this.state.month : this.state.month)} />
                        <br />
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </form>
                </div>
                {/* checked={this.state.completed}
                            value={this.state.completed}/> */}
                <Histogram
                    xLabels={days}
                    yValues={freq}
                    width='800'
                    height='500'
                    options={options}
                />
            </div>
        )
    }
}