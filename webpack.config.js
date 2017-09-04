 module.exports = {
    devtool: "source-map",
    entry: './src/app.js',
    output: {
        path: __dirname,
        sourceMapFilename: "app.bundle.map",
        filename: 'app.bundle.js'
    },
    watch: true
 };