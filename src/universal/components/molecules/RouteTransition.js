import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, Transition } from 'react-transition-group';
import cx from 'classnames';

class RouteTransition extends PureComponent {
    static propTypes = {
        children: PropTypes.element.isRequired,
        color: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired,
        time: PropTypes.number.isRequired,
    };

    static defaultProps = {
        time: 1,
        color: '#000000',
    };

    state = {
        wipeIsVisible: false,
    };

    componentDidMount() {
        this.setupCanvas();
        window.addEventListener('resize', this.setupCanvas, false);
    }

    // object to store canvas wipe tweens
    wipe = {
        x: 0,
    };

    setupCanvas = () => {
        // no need for hi-res
        const devicePixelRatio = 1; // window.devicePixelRatio ||

        this.ctx = this.refs.wipe.getContext('2d');
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
        this.canvas = this.refs.wipe;
        this.refs.wipe.width = window.innerWidth * devicePixelRatio;
        this.refs.wipe.height = window.innerHeight * devicePixelRatio;
    };

    drawWipe = () => {
        // clear previous drawings
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // rect dims
        const x = this.wipe.x;
        const y = 0;
        const h = this.canvas.height;
        const w = this.canvas.width;

        // draw the rectangle with pattern fill to wipe on the screen

        this.ctx.fillStyle = this.props.color;
        this.ctx.fillRect(x, y, w, h);
    };

    wipeOn = () => {
        this.setState({
            wipeIsVisible: true,
        });

        TweenLite.fromTo(
            this.wipe,
            this.props.time,
            {
                x: -this.canvas.width,
            },
            {
                x: 0,
                ease: Power3.easeOut,
                onUpdate: () => {
                    this.drawWipe();
                },
                onComplete() {
                    const scrollEl = window.document.body; // might need html scroll element in firefox
                    scrollEl.scrollTop = 0;
                },
            }
        );
    };

    wipeOff = () => {
        TweenLite.fromTo(
            this.wipe,
            this.props.time,
            {
                x: 0,
            },
            {
                x: this.canvas.width,
                ease: Power3.easeOut,
                delay: 1,
                onUpdate: () => {
                    this.drawWipe();
                },
                onComplete: () => {
                    this.setState({
                        wipeIsVisible: false,
                    });
                },
            }
        );
    };

    render() {
        const { wipeIsVisible } = this.state;
        const { children, location, time } = this.props;

        // const key = location.key;
        const key = location.pathname;

        const transClass = cx('route-transition', {
            'is-wiping': wipeIsVisible,
        });

        const timeout = {
            enter: time * 1000,
            exit: time * 1000,
        };

        const style = {
            display: wipeIsVisible ? 'block' : 'none',
        };

        return (
            <div className={transClass}>
                <canvas ref="wipe" className="wipe" style={style} />
                <TransitionGroup>
                    <Transition
                        timeout={timeout}
                        onEntering={this.wipeOn}
                        onEnter={this.wipeOff}
                        key={key}
                    >
                        {status => (
                            <div className={`transition-${status}`}>
                                {children}
                            </div>
                        )}
                    </Transition>
                </TransitionGroup>
            </div>
        );
    }
}

export default RouteTransition;
