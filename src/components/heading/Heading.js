import React, { Component } from 'react';
import './Heading.scss';
import { ReactComponent as SearchSVG } from '../../assets/icons/search.svg';
import { ReactComponent as BellSVG } from '../../assets/icons/notification.svg';
import { ReactComponent as UserSVG } from '../../assets/icons/avatar.svg';
class Heading extends Component {

    render() {
        return (
            <div className="heading-flex-box">
                <h1>Dashboard</h1>
                <div className="actions-wrapper">
                    <SearchSVG height="25" className="action-item"></SearchSVG>
                    <BellSVG height="30" className="action-item"></BellSVG>
                    <UserSVG height="50" className="action-item"></UserSVG>
                </div>
            </div>
        );
    }

}

export default Heading;