const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash:7].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/', // Путь, который будет использован в HTML для загрузки изображений
                        },
                    },
                ],
            },
            {
                test: /\.svg$/i,
                use: [
                    'svg-url-loader',
                    {
                        loader: 'svgo-loader',
                        options: {
                            name: 'images/[name].[hash:7].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/', // Путь, который будет использован в HTML для загрузки SVG
                        },
                    },
                ],
            },

        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        open: true,
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
