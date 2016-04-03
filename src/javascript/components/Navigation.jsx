import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Navigation extends React.Component {

    render() {
        return (
            <div className="container">
                <IndexLink to="/" className="logo" activeClassName="is-current">Home</IndexLink>
                <Link to="/projects" activeClassName="is-current">Projects</Link>
                <Link to="/makejavascriptgreatagain" activeClassName="is-current">Outside</Link>
                <Link to="https://github.com/MadeInHaus/react-flux-gulp-starter" target="_blank">Github</Link>
            </div>
        );
    }
}
