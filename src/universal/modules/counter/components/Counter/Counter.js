import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

class Counter extends Component {
    static propTypes = {
        incrementCount: PropTypes.func.isRequired,
        decrementCount: PropTypes.func.isRequired,
        count: PropTypes.number.isRequired,
    };

    handleLinkClick(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    handleIncrementClick(incrementCount, event) {
        this.handleLinkClick(event);
        incrementCount();
    }

    handleDecrementClick(decrementCount, event) {
        this.handleLinkClick(event);
        decrementCount();
    }

    render() {
        const { count, incrementCount, decrementCount } = this.props;

        return (
            <h1>
                <button
                    onClick={this.handleIncrementClick.bind(
                        this,
                        incrementCount
                    )}
                >
                    +
                </button>
                <button
                    onClick={this.handleDecrementClick.bind(
                        this,
                        decrementCount
                    )}
                >
                    -
                </button>
            </h1>
        );
    }
}

export default Counter;
