const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    devtool: "source-map",
    entry: './src/app.js',
    output: {
        path: __dirname,
        sourceMapFilename: "app.bundle.map",
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
              }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ],
    watch: true
};