import { Component } from 'react';
import './Charts.scss';

class Charts extends Component {
    render() {
        return (
            <div className="chart-flex-wrapper">
                <div className="main-chart"></div>
                <div className="side-charts">
                    <div className="chart-top"></div>
                    <div className="chart-bottom"></div>
                </div>
            </div>
        );
    }
}
export default Charts;
