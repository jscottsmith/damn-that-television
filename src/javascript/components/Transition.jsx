import React, { PropTypes } from 'react';
import cx from 'classnames';

class Transition extends React.Component {

    constructor() {
        super();
        this.state = {
            isEntering: false,
        };
    }

    // componentWillAppear(callback) {}
    // componentDidAppear() {}

    componentWillEnter(callback) {
        this.setState({
            isEntering: true,
        });

        setTimeout(() => {
            callback();
        }, 4000);
    }

    componentDidEnter() {
        this.setState({
            isEntering: false,
        });
    }

    componentWillLeave(callback) {
        this.setState({
            isLeaving: true,
        });

        setTimeout(() => {
            callback();
        }, 4000);
    }

    componentDidLeave() {
        this.setState({
            isLeaving: false,
        });
    }

    render() {
        const className = cx('transition-group', {
            'is-entering': this.state.isEntering,
            'is-leaving': this.state.isLeaving,
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
}


export default Transition;
