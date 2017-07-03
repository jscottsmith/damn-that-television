import React from 'react';
import Helmet from 'react-helmet';

export default function NotFound() {
    return (
        <article>
            <Helmet title="404" />
            <h1>404 (Not Found)</h1>
        </article>
    );
}
