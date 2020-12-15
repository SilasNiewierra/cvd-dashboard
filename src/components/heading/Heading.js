import React, { Component } from 'react';
import './Heading.scss';
import { ReactComponent as SearchSVG } from '../../assets/icons/search.svg';
import { ReactComponent as BellSVG } from '../../assets/icons/notification.svg';
import { ReactComponent as UserSVG } from '../../assets/icons/avatar.svg';
class Heading extends Component {

    render() {
        return (
            <div className="heading-flex-box">
                <h2>CVD19 - Dashboard</h2>
                <div className="actions-wrapper">
                    <SearchSVG height="20" className="action-item"></SearchSVG>
                    <BellSVG height="25" className="action-item"></BellSVG>
                    <UserSVG height="40" className="action-item"></UserSVG>
                </div>
            </div>
        );
    }

}

export default Heading;