// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const withSass = require('@zeit/next-sass');
// module.exports = withSass({
//     cssModules: true,
// });

module.exports = withSass({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: 'html-loader',
                },
                {
                    loader: 'markdown-loader',
                    options: {
                        /* your options here */
                    },
                },
            ],
        });

        return config;
    },
});
