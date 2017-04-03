import React, { PropTypes } from 'react';

const propTypes = {
    head: PropTypes.object.isRequired,
    markup: PropTypes.string, // intentionally optional
    state: PropTypes.object.isRequired,
};

const contextTypes = {
    assetUrl: PropTypes.func.isRequired,
};

const Html = (props, context) => (
    <html>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />

            {props.head.title.toComponent()}
            {props.head.meta.toComponent()}

            <script src="https://use.typekit.net/bwo5nqc.js" />
            <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load({ async: true });}catch(e){}' }}/>

            <link rel="shortcut icon" type="image/x-icon" href={context.assetUrl('/assets/icons/favicon.ico')} />

            {!__DEV__ && <link rel="stylesheet" href={context.assetUrl('/css/styles.css')} />}

        </head>
        <body>
            <div dangerouslySetInnerHTML={{ __html: props.markup }} id="app" className="app" />
            <script dangerouslySetInnerHTML={{ __html: props.state }} />
            <script defer src={context.assetUrl('/js/common.bundle.js')} />
            <script defer src={context.assetUrl('/js/client.js')} />
        </body>
    </html>
);

Html.propTypes = propTypes;
Html.contextTypes = contextTypes;

export default Html;
