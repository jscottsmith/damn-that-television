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
        switch (event.keyCode) {
            // space
            case 32:
                GameStore.dispatch(eventActions.pointerDown);
                break;
        }
    };

    handleKeyup = (event) => {
        // key events
        switch (event.keyCode) {
            // space
            case 32:
                GameStore.dispatch(eventActions.pointerUp);
                break;
        }
    };
}
