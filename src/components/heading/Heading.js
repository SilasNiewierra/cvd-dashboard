import React, { Component } from 'react';
import './Heading.scss';
import { ReactComponent as UserSVG } from '../../assets/icons/planet-earth.svg';
import SimpleDialog from '../dialog/SimpleDialog';

class Heading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            slug: this.props.slug,
            countries: null,
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);

    }

    fetchData() {
        fetch("https://api.covid19api.com/countries")
            .then(resp => resp.json())
            .then((data) => {
                if (data !== null) {
                    data.sort(function (a, b) {
                        a = a.Slug.toLowerCase();
                        b = b.Slug.toLowerCase();

                        return (a < b) ? -1 : (a > b) ? 1 : 0;
                    })
                    this.setState({ countries: data })
                }
            });
    }

    componentDidMount() {
        this.fetchData()
    }

    closeDialog(slugValue) {
        this.setState({
            open: false
        });

        if (slugValue !== "") {
            this.props.handler(slugValue);
        }
    }

    openDialog() {
        this.setState({
            open: true
        });
    }

    render() {
        return (
            <div className="heading-flex-box">
                <h2>CVD19 - Dashboard</h2>
                <div className="actions-wrapper">
                    <UserSVG height="40" className="action-item" onClick={this.openDialog}></UserSVG>
                    <SimpleDialog open={this.state.open} closeDialogHandler={this.closeDialog} slug={this.props.slug} countries={this.state.countries}></SimpleDialog>
                </div>
            </div>
        );
    }

}

export default Heading;