import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Split from '../atoms/Split';

export default class Hero extends PureComponent {
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
                <div className="bg" style={{ backgroundColor: color }} />
            </header>
        );
    }
}
