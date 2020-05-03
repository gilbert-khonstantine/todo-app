import React, { Component } from 'react';
import axios from 'axios';
import Histogram from 'react-chart-histogram';
import { getCurrentDate } from './utils'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            //default month is this month.
            month: new Date(getCurrentDate()).getMonth() + 1,
            year: new Date(getCurrentDate()).getFullYear(),
            todos: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/query/" + this.state.month)
            .then((res) => {
                this.setState({
                    todos: res.data
                })
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get("http://localhost:4000/query/" + this.state.month)
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
        const labels = ['2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018', '2016', '2017', '2018'];
        // this is the frequency
        const data = [324, 45, 672, 324, 45, 672, 324, 45, 672, 324, 45, 672, 324, 45, 672, 324, 45, 672, 324, 45, 672, 324, 45, 672, 324, 45];
        const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
        return (
            <div>
                <h1>SHOW DASHBOARD</h1>
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
                    xLabels={labels}
                    yValues={data}
                    width='800'
                    height='500'
                    options={options}
                />
            </div>
        )
    }
}