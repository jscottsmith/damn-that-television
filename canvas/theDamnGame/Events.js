import gameStore from './store/gameStore.js';
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
        gameStore.dispatch(eventActions.pointerDown);
    };

    handleInteractEnd = () => {
        gameStore.dispatch(eventActions.pointerUp);
    };

    handleKeydown = (event) => {
        switch (event.code) {
            case 'Space':
                gameStore.dispatch(eventActions.pointerDown);
                break;
            case 'ArrowLeft':
                gameStore.dispatch(eventActions.arrowLeftDown);
                break;
            case 'ArrowRight':
                gameStore.dispatch(eventActions.arrowRightDown);
                break;
            default:
        }
    };

    handleKeyup = (event) => {
        switch (event.code) {
            case 'Space':
                gameStore.dispatch(eventActions.pointerUp);
                break;
            case 'ArrowLeft':
                gameStore.dispatch(eventActions.arrowLeftUp);
                break;
            case 'ArrowRight':
                gameStore.dispatch(eventActions.arrowRightUp);
        }
    };
}
