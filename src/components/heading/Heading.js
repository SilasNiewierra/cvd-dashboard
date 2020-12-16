import React, { Component } from 'react';
import './Heading.scss';
import { ReactComponent as SearchSVG } from '../../assets/icons/search.svg';
import { ReactComponent as BellSVG } from '../../assets/icons/notification.svg';
import { ReactComponent as UserSVG } from '../../assets/icons/planet-earth.svg';
import SimpleDialog from '../dialog/SimpleDialog';

class Heading extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            open: false, 
            slug: this.props.slug, 
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);

    }

    closeDialog(slugValue) {
        this.setState({
            open: false
        });

        if (slugValue !== ""){
            this.props.handler(slugValue);
        }
    }

    openDialog() {
        this.setState({
            open: true
        });
    }

    render() {
        var countryName = titleCase(this.props.country.replaceAll('-', " "));
        return (
            <div className="heading-flex-box">
                <h2>CVD19 - {countryName}</h2>
                <div className="actions-wrapper">
                    <SearchSVG height="20" className="action-item"></SearchSVG>
                    <BellSVG height="25" className="action-item" ></BellSVG>
                    <UserSVG height="40" className="action-item" onClick={this.openDialog}></UserSVG>
                    <SimpleDialog open={this.state.open} closeDialogHandler={this.closeDialog} slug={this.props.slug} ></SimpleDialog>
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

export default Heading;