// https://gist.github.com/fatihacet/1290216

export default function PubSub() {
    const topics = {};
    let subUid = -1;

    this.subscribe = function(topic, func) {
        // console.log('SUB', topic);

        if (!topics[topic]) {
            topics[topic] = [];
        }
        const token = (++subUid).toString();
        topics[topic].push({
            token,
            func,
        });
        return token;
    };

    this.publish = function(topic, args) {
        // console.log('PUB', topic);

        if (!topics[topic]) {
            return false;
        }
        setTimeout(function() {
            const subscribers = topics[topic];
            let len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].func(topic, args);
            }
        }, 0);
        return true;
    };

    this.unsubscribe = function(token) {
        // console.log('UNSUB', token);

        for (const m in topics) {
            if (topics[m]) {
                for (let i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return false;
    };
}
