import React, { PropTypes } from 'react';
import cx from 'classnames';

class Transition extends React.Component {

    static propTypes = {
        time: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        pattern: PropTypes.string.isRequired,
    };

    static defaultProps = {
        time: 0.7,
        color: '#ECBAB4',
        pattern: '/images/pattern_4.svg',
    }

    constructor() {
        super();
        this.drawWipe = this.drawWipe.bind(this);
        this.state = {
            isEntering: false,
            isLeaving: false,
            wipeIsVisible: false,
            pattern: null,
        };

        // object to store canvas wipe tweens
        this.wipe = {
            x: 0,
        };
    }

    componentWillMount() {
        // load the image for canvas and saves to state
        this.loadImage(this.props.pattern)
            .then(result => {
                this.setState({
                    pattern: result,
                });
            })
            .catch(url => {
                console.error(`Error loading ${url}`);
            });
    }

    componentDidMount() {
        this.setupCanvas();
    }

    setupCanvas() {
        const devicePixelRatio = window.devicePixelRatio || 1;

        this.context = this.refs.wipe.getContext('2d');
        this.context.scale(devicePixelRatio, devicePixelRatio);
        this.canvas = this.refs.wipe;
        this.refs.wipe.width = window.innerWidth * devicePixelRatio;
        this.refs.wipe.height = window.innerHeight * devicePixelRatio;
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            if (img.naturalWidth && img.naturalHeight && img.complete) {
                resolve(img);
            } else {
                img.onload = () => { resolve(img); };
                img.onerror = () => { reject(url); };
            }
        });
    }

    drawWipe() {
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
        const pattern = this.context.createPattern(this.state.pattern, 'repeat');
        this.context.fillStyle = pattern;
        this.context.fillRect(x, y, w, h);
    }

    // componentWillAppear(callback) {}
    // componentDidAppear() {}

    componentWillEnter(callback) {
        this.setState({
            isEntering: true,
            wipeIsVisible: true,
        });

        TweenLite.fromTo(this.wipe, this.props.time, {
            x: -this.canvas.width,
        }, {
            x: 0,
            ease: Power3.easeOut,
            onUpdate: () => {
                this.drawWipe();
            },
            onComplete() {
                callback();
            },
        });
    }

    componentDidEnter() {
        this.setState({
            isEntering: false,
        });

        TweenLite.fromTo(this.wipe, this.props.time, {
            x: 0,
        }, {
            x: this.canvas.width,
            ease: Power3.easeOut,
            delay: 0.5,
            onUpdate: () => {
                this.drawWipe();
            },
            onComplete: () => {
                this.setState({
                    wipeIsVisible: false,
                });
            },
        });
    }

    componentWillLeave(callback) {
        this.setState({
            isLeaving: true,
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

        const transClass = cx('transition', {
            'is-wiping': this.state.wipeIsVisible,
        });

        const style = {
            display: this.state.wipeIsVisible ? 'block' : 'none',
        };

        const className = cx('transition-group', {
            'is-entering': this.state.isEntering,
            'is-leaving': this.state.isLeaving,
        });

        return (
            <div className={transClass}>
                <canvas ref="wipe" className="wipe" style={style} />
                <div className={className}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default Transition;
