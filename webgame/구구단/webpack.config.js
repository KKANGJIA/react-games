const path = require('path');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    

    entry: {
        app: './client',
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
            },
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },
}