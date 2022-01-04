let instance = null;

export default class PubSub {
  static createPubSub() {
    if (!instance) {
      instance = new PubSub();
    }
    return instance;
  }

  constructor() {
    this.topics = {};
    this.subUid = -1;
  }

  subscribe(topic, func) {
    // console.log('SUB', topic);

    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    const token = (++this.subUid).toString();
    this.topics[topic].push({
      token,
      func,
    });
    return token;
  }

  publish(topic, args) {
    // console.log('PUB', topic);
    if (!this.topics[topic]) {
      return false;
    }

    setTimeout(() => {
      const subscribers = this.topics[topic];
      let len = subscribers ? subscribers.length : 0;

      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);

    return true;
  }

  unsubscribe(token) {
    // console.log('UNSUB', token);

    for (const m in this.topics) {
      if (this.topics[m]) {
        for (let i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  }
}
