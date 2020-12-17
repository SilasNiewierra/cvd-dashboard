import { Component } from 'react';
import './Charts.scss';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, AreaChart, Area, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

class Charts extends Component {

    componentDidMount() {
        const apiUrl = 'https://api.covid19api.com/dayone/country/'+this.props.slug;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => console.log('This is your data', data));
      }

    render() {
        var countryName = titleCase(this.props.slug.replaceAll('-', " "));

        const data = [
            { name: 'Page E', uv: 400, pv: 2400, amt: 2400 },
            { name: 'Page A', uv: 100, pv: 2200, amt: 2000 },
            { name: 'Page B', uv: 500, pv: 2000, amt: 2100 },
            { name: 'Page C', uv: 700, pv: 2110, amt: 2200 },
            { name: 'Page D', uv: 200, pv: 3000, amt: 2300 },];

        return (
            <div className="chart-flex-wrapper">
                <div className="main-chart">
                    <h2>{countryName} - New Infections</h2>
                    <ResponsiveContainer width="90%" height="80%">

                        <BarChart data={data}>
                            <CartesianGrid stroke="#7275AA" strokeWidth={2} vertical={false} strokeDasharray="5 5" />
                            <XAxis dataKey="name" strokeDasharray="5 5" stroke="#7275AA" strokeWidth={2} />
                            <YAxis axisLine={false} stroke="#7275AA" strokeWidth={2} />

                            <Bar dataKey="uv" stackId="x" fill="#06CBFF" radius={[0, 0, 10, 10]} barSize={20}></Bar>
                            <Bar dataKey="pv" stackId="x" fill="#4676FE"></Bar>
                            <Bar dataKey="amt" stackId="x" fill="#0E9BC8" radius={[10, 10, 0, 0]}></Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="side-charts">
                    <div className="chart-top">
                        <div className="chart-top-content">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart onMouseEnter={this.onPieEnter}>
                                    <Pie
                                        data={data}
                                        innerRadius="80%"
                                        outerRadius="100%"
                                        strokeWidth={0}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="uv">
                                        {
                                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={'#4676FE'} />)
                                        }
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="content">
                                <h2 className="title">25%</h2>
                                <p className="info">Less Infections today</p>
                            </div>
                        </div>
                        <div className="chart-top-content">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart onMouseEnter={this.onPieEnter}>
                                    <Pie
                                        data={data}
                                        innerRadius="80%"
                                        outerRadius="100%"
                                        strokeWidth={0}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="pv">
                                        {
                                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={'#FB8056'} />)
                                        }
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="content">
                                <h2 className="title">82%</h2>
                                <p className="info">More Infections then last week</p>
                            </div>
                        </div>



                    </div>
                    <div className="chart-bottom">
                        <ResponsiveContainer width="80%" height="40%">

                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4676FE" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4676FE" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip />
                                <Area type="monotone" dataKey="uv" stroke="#4676FE" fillOpacity={1} fill="url(#colorUv)" strokeWidth={3} />
                            </AreaChart>

                        </ResponsiveContainer>

                        <div className="content">
                            <h2 className="title">9123</h2>
                            <p className="info">New Infections each day</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }


export default Charts;
