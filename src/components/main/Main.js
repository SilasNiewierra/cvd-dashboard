import React, { Component } from 'react';
import './Main.scss';
import TopCards from './../top_cards/TopCards';
import Heading from './../heading/Heading';
import Charts from './../charts/Charts';
import News from './../news/News';

class Main extends Component {

    render() {
        return (
            <div class="flex-box">
                <div class="heading"><Heading></Heading></div>
                <div class="info-cards"><TopCards></TopCards></div>
                <div class="analytics"><Charts></Charts></div>
                <div class="pending"><News></News></div>
            </div>
        );
    }

}

export default Main;