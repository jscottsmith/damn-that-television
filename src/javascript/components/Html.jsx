import React, { PropTypes } from 'react';

class Html extends React.Component {
    static propTypes = {
        head: PropTypes.object.isRequired,
        markup: PropTypes.string.isRequired,
        state: PropTypes.object.isRequired,
    };

    static contextTypes = {
        assetUrl: PropTypes.func.isRequired,
    };

    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    {this.props.head.title.toComponent()}
                    {this.props.head.meta.toComponent()}

                    <link rel="shortcut icon" href={this.context.assetUrl('/images/favicon.png')} />
                    <link rel="stylesheet" href={this.context.assetUrl('/css/styles.css')} />
                    <script src="https://use.typekit.net/bwo5nqc.js" />
                    <script dangerouslySetInnerHTML={{ __html: 'try{Typekit.load({ async: true });}catch(e){}' }}/>
                </head>
                <body>
                    <div
                        id="app"
                        className="app"
                        dangerouslySetInnerHTML={{ __html: this.props.markup }}
                    />
                    <script dangerouslySetInnerHTML={{ __html: this.props.state }} />
                    <script src={this.context.assetUrl('/js/client.js')} defer />
                </body>
            </html>
        );
    }
}

export default Html;
