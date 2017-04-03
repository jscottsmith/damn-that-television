require('dotenv').load({ silent: true });

function devServer(app) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const DashboardPlugin = require('webpack-dashboard/plugin');
    const config = require('./config/webpack.config.development');

    const compiler = webpack(config);

    // Apply CLI dashboard for your webpack dev server
    compiler.apply(new DashboardPlugin());

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
        },
        historyApiFallback: true,
    }));

    app.use(webpackHotMiddleware(compiler));
}

require('./build/server/server')(devServer);
