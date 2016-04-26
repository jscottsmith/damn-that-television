import React, { PropTypes } from 'react';
import cx from 'classnames';

class Transition extends React.Component {

    constructor() {
        super();
        this.state = {
            isEntering: null,
        };
    }

    componentWillEnter(callback) {
        this.setState({
            isEntering: true,
        });

        callback();
    }

    componentDidEnter() {
        this.setState({
            isEntering: null,
        });
    }

    componentWillLeave(callback) {
        this.setState({
            isEntering: false,
        });
        setTimeout(() => {
            callback();
        }, 4000);
    }

    render() {
        const className = cx({
            'is-entering': this.state.isEntering,
            'is-leaving': this.state.isEntering === false,
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}


export default Transition;
