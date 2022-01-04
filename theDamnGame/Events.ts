import eventTypes from './constants/eventTypes';
import gameEvents from './events/gameEvents';

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
    gameEvents.publish(eventTypes.POINTER_DOWN);
  };

  handleInteractEnd = () => {
    gameEvents.publish(eventTypes.POINTER_UP);
  };

  handleKeydown = (event) => {
    switch (event.code) {
      case 'Space':
        gameEvents.publish(eventTypes.POINTER_DOWN);
        break;
      case 'ArrowLeft':
        gameEvents.publish(eventTypes.ARROW_LEFT_DOWN);
        break;
      case 'ArrowRight':
        gameEvents.publish(eventTypes.ARROW_RIGHT_DOWN);
        break;
      default:
    }
  };

  handleKeyup = (event) => {
    switch (event.code) {
      case 'Space':
        gameEvents.publish(eventTypes.POINTER_UP);
        break;
      case 'ArrowLeft':
        gameEvents.publish(eventTypes.ARROW_LEFT_UP);
        break;
      case 'ArrowRight':
        gameEvents.publish(eventTypes.ARROW_RIGHT_UP);
    }
  };
}
