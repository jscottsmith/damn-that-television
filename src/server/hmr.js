const HMR = app => {
    log('HMR is Enabled');

    const webpack = require('webpack');
    const devWebpackConfig = require('../../webpack/webpack.config.dev.client.js');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(devWebpackConfig);

    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: true,
            hot: true,
            publicPath: devWebpackConfig.output.publicPath,
        })
    );

    app.use(
        webpackHotMiddleware(compiler, {
            log: console.log,
            reload: true,
        })
    );

    return app;
};

export default HMR;
