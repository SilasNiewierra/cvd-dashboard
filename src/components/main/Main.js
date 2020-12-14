import React, { Component } from 'react';
import './Main.scss';
import TopCards from './../top_cards/TopCards';
import Heading from './../heading/Heading';

class Main extends Component {

    render() {
        return (
            <div class="flex-box">
                <div class="heading"><Heading></Heading></div>
                <div class="info-cards"><TopCards></TopCards></div>
                <div class="analytics"></div>
                <div class="pending"></div>
            </div>
        );
    }

}

export default Main;