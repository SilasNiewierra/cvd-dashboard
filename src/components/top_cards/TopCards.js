import { Component } from 'react';
import './TopCards.scss';
// import { ReactComponent as ArrowUpSVG } from '../../assets/icons/arrow_up.svg';
// import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as NewCasesSVG } from '../../assets/icons/topcards/new.svg';
import { ReactComponent as TotalCasesSVG } from '../../assets/icons/topcards/total.svg';
import { ReactComponent as DeadSVG } from '../../assets/icons/topcards/dead.svg';
import { ReactComponent as RecoveredSVG } from '../../assets/icons/topcards/recovered.svg';


class TopCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cvdData: []
        };
    }

    componentDidMount() {
        const apiUrl = 'https://api.covid19api.com/summary';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data = data['Global'];
                const dataMap = [
                    { icon: <NewCasesSVG height="40" className="icon icon_new"></NewCasesSVG>, title: data['NewConfirmed'], info: "New Confirmed" },
                    { icon: <TotalCasesSVG height="40" className="icon icon_total"></TotalCasesSVG>, title: data['TotalConfirmed'], info: "Total Confirmed" },
                    { icon: <DeadSVG height="40" className="icon icon_dead"></DeadSVG>, title: data['TotalDeaths'], info: "Total Deaths" },
                    { icon: <RecoveredSVG height="40" className="icon icon_recovered"></RecoveredSVG>, title: data['TotalRecovered'], info: "Total Recovered" }];

                this.setState({ cvdData: dataMap })
            });
    }


    render() {
        var placeholderItems = [
            { icon: <NewCasesSVG height="40" className="icon icon_new"></NewCasesSVG>, title: "100282", info: "New Confirmed" },
            { icon: <TotalCasesSVG height="40" className="icon icon_total"></TotalCasesSVG>, title: "1162857", info: "Total Confirmed" },
            { icon: <DeadSVG height="40" className="icon icon_dead"></DeadSVG>, title: "63263", info: "Total Deaths" },
            { icon: <RecoveredSVG height="40" className="icon icon_recovered"></RecoveredSVG>, title: "230845", info: "Total Recovered" }];

        return (
            <div className="card-wrapper">
                {this.state.cvdData !== null &&
                    this.state.cvdData.map((item, index) =>
                        <div className="card" key={index}>
                            {item.icon}
                            <div className="content">
                                <h2 className="title">{item.title}</h2>
                                <p className="info">{item.info}</p>
                            </div>
                        </div>
                    )}

                {this.state.cvdData === null &&
                    placeholderItems.map((item, index) =>
                        <div className="card" key={index}>
                            {item.icon}
                            <div className="content">
                                <h2 className="title">{item.title}</h2>
                                <p className="info">{item.info}</p>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

export default TopCards;