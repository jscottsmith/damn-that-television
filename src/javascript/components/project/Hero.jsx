import React, { Component, PropTypes } from 'react';
import Split from 'components/utility/Split';

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
                    <h1>
                        <Split>{title}</Split>
                    </h1>
                </div>
                <div className="bg" style={{ backgroundColor: color }}/>
            </header>
        );
    }

}
