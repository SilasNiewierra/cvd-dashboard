import './News.scss';
import { Component } from 'react';
import DataFormatter from './../../providers/DataFormatter';

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsData: null
        };
    }

    fetchData() {
        const apiUrl = 'https://cvd-dashboard-backend.herokuapp.com/news';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data !== null && data['status'] !== "error") {
                    let articles = data['articles'];
                    if (articles !== null && articles.length > 0) {
                        let parsedData = articles.map((article) => {
                            return {
                                source: article['source']['name'],
                                title: article['title'],
                                url: article['url'],
                                date: article['publishedAt'],
                            }
                        })
                        this.setState({ newsData: parsedData });
                    }
                }
            });
    }

    componentDidMount() {
        this.fetchData();
        let interval = 1000 * 60 * 10; // every 10 minutes
        setInterval(this.fetchData.bind(this), interval);
    }

    readMoreClicked(url) {
        window.open(url, '_blank');
    }

    render() {
        const dataFormatter = new DataFormatter();

        const newsDataPlaceholder = [
            {
                source: "t-online.de",
                title: "Weitere EU-Länder verschärfen Maßnahmen",
                url: "https://www.t-online.de/nachrichten/panorama/id_89109266/corona-news-weitere-eu-laender-verschaerfen-massnahmen.html",
                date: "2020-12-18T08:01:00Z"
            },
            {
                source: "Focus Online",
                title: "Coronavirus: Mehr als 31.000 Neuinfektionen in Deutschland - 4856 Patienten auf der Intensivstation",
                url: "https://www.focus.de/gesundheit/news/news-zur-pandemie-31-051-neuinfektionen-4856-intensivpatienten_id_12748369.html",
                date: "2020-12-18T08:14:00Z"
            }
        ];
        var renderData = this.state.newsData !== null ? this.state.newsData : newsDataPlaceholder;
        return (
            <div className="news-flex-wrapper">
                <p className="news-heading">News</p>
                {renderData.map((item, index) =>
                    <div className="news-item" key={index}>
                        <div className="news-item-wrapper">
                            <div className="news-content">
                                <p className="title">{item.title}</p>
                                <p className="info">{item.source}</p>
                            </div>
                            <p className="news-date">Published: {dataFormatter.formatDate(item.date)}</p>
                            <button className="news-action" onClick={() => this.readMoreClicked(item.url)}>More</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

}
export default News;