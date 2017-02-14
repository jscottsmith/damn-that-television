import React, { Component, PropTypes } from 'react';

export default class Hero extends Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    };

    render() {
        const { color, title } = this.props;

        return (
            <header className="project-hero">
                <div className="wrapper">
                    <h1>{title}</h1>
                </div>
                <div className="bg" style={{ backgroundColor: color }}/>
            </header>
        );
    }

}
