import { Component } from 'react';
import './Charts.scss';
import { ReactComponent as ArrowUpSVG } from '../../assets/icons/arrow_up.svg';
import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrow_down.svg';
import DataFormatter from '../../providers/DataFormatter.js';
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    Tooltip,
    Legend,
    ComposedChart
} from 'recharts';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: null
        };
    }

    fetchData() {
        const apiUrl = 'https://api.covid19api.com/dayone/country/' + this.props.slug;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data !== null) {
                    console.log(data);
                    let parsedData = data.map((obj) => {
                        return {
                            Date: obj['Date'].split('T')[0],
                            Confirmed: obj['Confirmed'],
                            Active: obj['Active'],
                            Deaths: obj['Deaths'],
                            Recovered: obj['Recovered'],
                            ConfirmedDeathsRatio: (obj['Deaths'] / obj['Confirmed'] * 100).toFixed(2)
                        }
                    })
                    this.setState({ chartData: parsedData });
                }
            });
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.slug !== prevProps.slug) {
            this.fetchData();
        }
      }

    componentDidMount() {
        this.fetchData()
    }

    renderColorfulLegendText(value, entry) {
        const { color } = entry;

        return <span style={{ color }}>{value}</span>;
    }



    render() {
        const dataFormatter = new DataFormatter();

        var countryName = dataFormatter.titleCase(this.props.slug.replaceAll('-', " "));

        const placeholderData = [
            { Date: "2020-12-10", Active: 1, Confirmed: 1, Deaths: 0, Recovered: 0 },
            { Date: "2020-12-11", Active: 2, Confirmed: 2, Deaths: 0, Recovered: 0 },
            { Date: "2020-12-12", Active: 6, Confirmed: 10, Deaths: 1, Recovered: 3 },
            { Date: "2020-12-13", Active: 3, Confirmed: 10, Deaths: 1, Recovered: 6 },
            { Date: "2020-12-14", Active: 5, Confirmed: 15, Deaths: 3, Recovered: 7 },
            { Date: "2020-12-15", Active: 4, Confirmed: 20, Deaths: 4, Recovered: 12 }];

        var renderData = this.state.chartData === null ? placeholderData : this.state.chartData;


        let previousActiveCases = renderData[renderData.length - 2]['Active'];
        let currentActiveCases = renderData[renderData.length - 1]['Active'];
        let percentageActive = (currentActiveCases - previousActiveCases) / previousActiveCases * 100;

        var activeCaseObject = {
            icon: previousActiveCases > currentActiveCases ? <ArrowDownSVG height="40" className="icon icon_down"></ArrowDownSVG> : <ArrowUpSVG height="40" className="icon icon_up"></ArrowUpSVG>,
            data: percentageActive.toFixed(2),
            text: previousActiveCases > currentActiveCases ? "Less active cases then yesterday" : "More active cases then yesterday"
        }

        let previousConfirmedDeathsRatio = renderData[renderData.length - 2]['ConfirmedDeathsRatio'];
        let currentConfirmedDeathsRatio = renderData[renderData.length - 1]['ConfirmedDeathsRatio'];
        let currentDeaths = renderData[renderData.length - 1]['Deaths'];
        let currentConfirmed = renderData[renderData.length - 1]['Confirmed'];

        var confirmedDeathsRatio = {
            icon: previousConfirmedDeathsRatio > currentConfirmedDeathsRatio ? <ArrowDownSVG height="40" className="icon icon_down"></ArrowDownSVG> : <ArrowUpSVG height="40" className="icon icon_up"></ArrowUpSVG>,
            data: dataFormatter.numberWithSeperator(currentDeaths) + " / " + dataFormatter.numberWithSeperator(currentConfirmed),
            text: previousConfirmedDeathsRatio > currentConfirmedDeathsRatio ? "Less deaths per confirmed case then yesterday" : "More deaths per confirmed case then yesterday"
        }


        return (
            <div className="chart-flex-wrapper">
                <div className="main-chart">
                    <h2>{countryName} - Total Statistics</h2>
                    <ResponsiveContainer width="90%" height="80%">


                        <ComposedChart data={renderData}>
                            <defs>
                                <linearGradient id="colorGradientConfirmed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hotpink" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="hotpink" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="colorGradientActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06CBFF" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#06CBFF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="colorGradientDeaths" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4676FE" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4676FE" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <defs>
                                <linearGradient id="colorGradientRecovered" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7C43DE" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#7C43DE" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <XAxis axisLine={false} dataKey="Date" stroke="#7275AA" minTickGap={20} />
                            <YAxis axisLine={false} stroke="#7275AA" strokeWidth={2} />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} formatter={this.renderColorfulLegendText} />
                            <CartesianGrid stroke="#7275AA" strokeWidth={2} vertical={false} strokeDasharray="5 5" />

                            <Area type="monotone" dataKey="Confirmed" stroke="hotpink" fillOpacity={0.5} fill="url(#colorGradientConfirmed)" strokeOpacity={0.5} strokeWidth={3} />

                            <Area type="monotone" dataKey="Active" stroke="#06CBFF" fillOpacity={0.5} fill="url(#colorGradientActive)" strokeOpacity={0.5} strokeWidth={3} />
                            <Area type="monotone" dataKey="Deaths" stroke="#4676FE" fillOpacity={0.5} fill="url(#colorGradientDeaths)" strokeOpacity={0.5} strokeWidth={3} />
                            <Area type="monotone" dataKey="Recovered" stroke="#7C43DE" fillOpacity={0.5} fill="url(#colorGradientRecovered)" strokeOpacity={0.5} strokeWidth={3} />
                        </ComposedChart>


                    </ResponsiveContainer>
                </div>
                <div className="side-charts">
                    <div className="chart-top">
                        <div className="chart-top-content">
                            {activeCaseObject.icon}
                            <div className="content">
                                <h2 className="title">{activeCaseObject.data}%</h2>
                                <p className="info">{activeCaseObject.text}</p>
                            </div>
                        </div>
                        <div className="chart-top-content">
                            {confirmedDeathsRatio.icon}
                            <div className="content">
                                <h2 className="title">{confirmedDeathsRatio.data}</h2>
                                <p className="info">{confirmedDeathsRatio.text}</p>
                            </div>
                        </div>



                    </div>
                    <div className="chart-bottom">
                        <ResponsiveContainer width="80%" height="40%">

                            <AreaChart data={renderData}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4676FE" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4676FE" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip />
                                <XAxis dataKey="Date" hide={true} />

                                <Area type="monotone" dataKey="ConfirmedDeathsRatio" stroke="#4676FE" fillOpacity={1} fill="url(#colorUv)" strokeWidth={3} />
                            </AreaChart>

                        </ResponsiveContainer>

                        <div className="content">
                            <h2 className="title">{renderData[renderData.length - 1]['ConfirmedDeathsRatio']} %</h2>
                            <p className="info">Confirmed to Death Ratio today</p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



export default Charts;
