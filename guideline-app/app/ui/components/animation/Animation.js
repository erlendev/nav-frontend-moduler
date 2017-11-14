import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bodymovin from 'bodymovin';

export default class Animation extends Component {
    componentDidMount() {
        bodymovin.loadAnimation({
            container: document.getElementById(this.props.domId),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: this.props.pathToJson
        });
    }

    render() {
        return (<div id={this.props.domId} />);
    }
}

Animation.propTypes = {
    pathToJson: PropTypes.string.isRequired,
    domId: PropTypes.string.isRequired
};
