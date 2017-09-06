import React, { Component } from 'react';

// Waits for a prop [data] to be truthy until rendering the component

export default function waitForIt(DataDependent, data) {
    return class Waiting extends Component {
        render() {
            // should probably check for empty objects too
            // but for now just falsy values. Multiple props
            // also might be necessary but for now keeping
            // things simple

            if (!this.props[data]) {
                return <h1>Loading</h1>;
            } else {
                return <DataDependent {...this.props} />;
            }
        }
    };
}
