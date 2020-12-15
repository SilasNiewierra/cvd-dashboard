import './News.scss';
import { Component } from 'react';

class News extends Component {
    render() {
        return (
            <div className="news-flex-wrapper">
                <p className="news-heading">News</p>
                <div className="news-item"></div>
                <div className="news-item"></div>
            </div>
        );
    }

}
export default News;