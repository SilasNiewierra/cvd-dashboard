import { Component } from 'react';

class RestfulProvider extends Component {

    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            api: this.props.restful
        };
    }

    render() {
        return this.props.children;
    }
}

RestfulProvider.childContextTypes = {
    api: React.PropTypes.object
};

export default RestfulProvider