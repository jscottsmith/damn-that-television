import App, { Container } from 'next/app';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import '../sass/root.scss';

export default class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <TransitionGroup>
                    <Component {...pageProps} />
                </TransitionGroup>
            </Container>
        );
    }
}
