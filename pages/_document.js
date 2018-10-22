import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script src="https://use.typekit.net/bwo5nqc.js" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: 'try{Typekit.load({ async: true });}catch(e){}',
                    }}
                />
            </html>
        );
    }
}
