import { Component } from 'react';
import './TopCards.scss';
import { ReactComponent as ArrowUpSVG } from '../../assets/icons/arrow_up.svg';
import { ReactComponent as ArrowDownSVG } from '../../assets/icons/arrow_down.svg';


class TopCards extends Component {
    render() {
        var items = [
            { icon: "up", title: "$10000", info: "Expenses this year" },
            { icon: "down", title: "4351", info: "Rides this year" },
            { icon: "up", title: "200", info: "Visitors this year" },
            { icon: "down", title: "60%", info: "Budget this year" }];

        return (
            <div className="card-wrapper">
                {items.map((item,index) =>
                    <div className="card" key={index}>
                        { item.icon === "up" &&
                            <ArrowUpSVG height="40" className="icon_up"></ArrowUpSVG>
                        }
                        { item.icon === "down" &&
                            <ArrowDownSVG height="40" className="icon_down"></ArrowDownSVG>
                        }
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