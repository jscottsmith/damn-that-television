import React, { PropTypes, PureComponent } from 'react';
import loadImage from '../utils/loadImage';
import cx from 'classnames';

class Transition extends PureComponent {
    static propTypes = {
        color: PropTypes.string.isRequired,
        pattern: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
    };

    static defaultProps = {
        time: 0.7,
        color: '#ECBAB4',
        pattern: '/images/pattern_4.svg',
    };

    state = {
        isEntering: false,
        isLeaving: false,
        pattern: null,
        transitionComplete: false,
        wipeIsVisible: false,
    };

    componentDidMount() {
        // load the image for canvas and saves to state
        loadImage(this.props.pattern)
            .then(result => {
                this.setState({
                    pattern: result,
                });
            })
            .catch(url => {
                console.error(`Error loading ${url}`);
            });

        this.setupCanvas();
    }

    // object to store canvas wipe tweens
    wipe = {
        x: 0,
    };

    setupCanvas() {
        const devicePixelRatio = window.devicePixelRatio || 1;

        this.context = this.refs.wipe.getContext('2d');
        this.context.scale(devicePixelRatio, devicePixelRatio);
        this.canvas = this.refs.wipe;
        this.refs.wipe.width = window.innerWidth * devicePixelRatio;
        this.refs.wipe.height = window.innerHeight * devicePixelRatio;
    }

    drawWipe = () => {
        // clear previous drawings
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // rect dims
        const x = this.wipe.x;
        const y = 0;
        const h = this.canvas.height;
        const w = this.canvas.width;

        // draw the rectangle with pattern fill to wipe on the screen

        this.context.fillStyle = this.props.color;
        this.context.fillRect(x, y, w, h);
        const pattern = this.context.createPattern(
            this.state.pattern,
            'repeat'
        );
        this.context.fillStyle = pattern;
        this.context.fillRect(x, y, w, h);
    };

    // componentWillAppear(callback) {}
    // componentDidAppear() {}

    componentWillEnter(callback) {
        this.setState({
            isEntering: true,
            wipeIsVisible: true,
            transitionComplete: false,
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
                    callback();
                },
            }
        );
    }

    componentDidEnter() {
        this.setState({
            isEntering: false,
        });

        TweenLite.fromTo(
            this.wipe,
            this.props.time,
            {
                x: 0,
            },
            {
                x: this.canvas.width,
                ease: Power3.easeOut,
                delay: 0.5,
                onUpdate: () => {
                    this.drawWipe();
                },
                onComplete: () => {
                    this.setState({
                        wipeIsVisible: false,
                        transitionComplete: true,
                    });
                },
            }
        );
    }

    componentWillLeave(callback) {
        this.setState({
            isLeaving: true,
            transitionComplete: false,
        });

        const time = this.props.time * 1000;

        setTimeout(() => {
            callback();
        }, time);
    }

    componentDidLeave() {
        this.setState({
            isLeaving: false,
        });
    }

    render() {
        const {
            isEntering,
            isLeaving,
            transitionComplete,
            wipeIsVisible,
        } = this.state;

        const transClass = cx('transition', {
            'is-wiping': wipeIsVisible,
        });

        const style = {
            display: wipeIsVisible ? 'block' : 'none',
        };

        const className = cx('transition-group', {
            'is-entering': isEntering,
            'is-leaving': isLeaving,
        });

        return (
            <div className={transClass}>
                <canvas ref="wipe" className="wipe" style={style} />
                <div className={className}>
                    {React.cloneElement(this.props.children, {
                        transitionComplete,
                    })}
                </div>
            </div>
        );
    }
}

export default Transition;
