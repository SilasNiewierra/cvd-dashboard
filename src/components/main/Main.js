import React, { Component } from 'react';
import './Main.scss';
import TopCards from './../top_cards/TopCards';
import Heading from './../heading/Heading';
import Charts from './../charts/Charts';
import News from './../news/News';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: "germany"
        }
    }



    handleCountrySelection = (selectedSlug) => {
        this.setState({
            slug: selectedSlug,
        })
      }

    render() {
        return (
            <div className="flex-box">
                <div className="heading"><Heading slug={this.state.slug} handler={this.handleCountrySelection}></Heading></div>
                <div className="info-cards"><TopCards></TopCards></div>
                <div className="analytics"><Charts slug={this.state.slug}></Charts></div>
                <div className="news"><News></News></div>
            </div>
        );
    }

}

export default Main;