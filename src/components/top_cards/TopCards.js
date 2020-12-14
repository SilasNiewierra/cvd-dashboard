import { Component } from 'react';
import './TopCards.scss';

class TopCards extends Component{
    render(){
        return(
            <div class="card-wrapper">
                <div class="card">
                    <p>arrow</p>
                    <p>$10000</p>
                </div>
                <div class="card">
                    <p>arrow</p>
                    <p>$10000</p>
                </div>
                <div class="card">
                    <p>arrow</p>
                    <p>$10000</p>
                </div>
                <div class="card">
                    <p>arrow</p>
                    <p>$10000</p>
                </div>
            </div>
        );
    }
}

export default TopCards;