const path = require('path');
// const { ModuleFilenameHelpers } = require('webpack');
const reactrefreshwebpackplugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'lecture',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: ['./client'],
    },
    module: {
        rules: [{ 
            test: /\.jsx?/, 
            loader: 'babel-loader',
            options: {
                presets: [
                ['@babel/preset-env',{
                    targets: {
                    browsers: ['> 5% in KR'],
                    },
                    debug: true,
                }],
                '@babel/preset-react',
                ],
                plugins : [
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins: [ new reactrefreshwebpackplugin() ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    },
    devServer: {
        publicPath: '/dist/',
        hot: true,
        port:3000,
    },
}