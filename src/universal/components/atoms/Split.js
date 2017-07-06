import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const PUSH = 0.08;

export default class Split extends PureComponent {
    static propTypes = {
        children: PropTypes.string.isRequired,
    };

    spanify() {
        const { children } = this.props;

        return children.split(' ').map((c, i) => {
            // const n = children.length - i - 1;
            const style = {
                transform: `translate3d(${-PUSH * i}em, 0, 0)`,
            };
            return (
                <span
                    key={i}
                    style={style}
                    ref={ref => (this[`ref${i}`] = ref)}
                >
                    {c}
                </span>
            );
        });
    }

    render() {
        const amount = (this.props.children.split(' ').length - 1) * PUSH;
        const style = {
            paddingLeft: `${amount}em`,
        };
        return (
            <div className="split-headline" style={style}>
                {this.spanify()}
            </div>
        );
    }
}
