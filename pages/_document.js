import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <script src="https://use.typekit.net/bwo5nqc.js" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html:
                                'try{Typekit.load({ async: true });}catch(e){}',
                        }}
                    />
                    <link rel="stylesheet" href="/_next/static/style.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
