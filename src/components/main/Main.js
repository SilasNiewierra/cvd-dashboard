import React, { Component } from 'react';
import './Main.scss';

class Main extends Component {

    render() {
        return (
            <div class="flex-box">
                <div class="heading"></div>
                <div class="cards"></div>
                <div class="analytics"></div>
                <div class="pending"></div>
            </div>
        );
    }

}

export default Main;