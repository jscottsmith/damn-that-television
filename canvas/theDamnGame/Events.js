import GameStore from './store/GameStore.js';
import * as eventActions from './actions/eventActions';

export default class Events {
    constructor(el) {
        this.el = el;
        this.addListeners();
    }

    addListeners() {
        ['mousedown', 'touchstart'].forEach((event) => {
            this.el.addEventListener(event, this.handleInteractStart, false);
        });

        ['mouseup', 'touchend'].forEach((event) => {
            this.el.addEventListener(event, this.handleInteractEnd, false);
        });

        window.addEventListener('keydown', this.handleKeydown, false);
        window.addEventListener('keyup', this.handleKeyup, false);
    }

    /* ----------------------------------------------------------*\
    |* Event Handlers
    \*----------------------------------------------------------*/

    handleInteractStart = (event) => {
        event.preventDefault();
        GameStore.dispatch(eventActions.pointerDown);
    };

    handleInteractEnd = () => {
        GameStore.dispatch(eventActions.pointerUp);
    };

    handleKeydown = (event) => {
        switch (event.code) {
            case 'Space':
                GameStore.dispatch(eventActions.pointerDown);
                break;
            case 'ArrowLeft':
                GameStore.dispatch(eventActions.arrowLeftDown);
                break;
            case 'ArrowRight':
                GameStore.dispatch(eventActions.arrowRightDown);
                break;
            default:
        }
    };

    handleKeyup = (event) => {
        switch (event.code) {
            case 'Space':
                GameStore.dispatch(eventActions.pointerUp);
                break;
            case 'ArrowLeft':
                GameStore.dispatch(eventActions.arrowLeftUp);
                break;
            case 'ArrowRight':
                GameStore.dispatch(eventActions.arrowRightUp);
        }
    };
}
