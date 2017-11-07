const webpack = require('webpack');
const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const vendors = [
    'react',
    'react-dom'
];
console.log('dirname', __dirname)
const WebpackConfig = {
    entry: {
        scripts: './sandbox/renderSandbox.js',
        vendors
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2', 'react'],
                    plugins: ['react-docgen', 'transform-object-rest-spread']
                },
                include: [
                    path.resolve(__dirname, './../../packages/node_modules'),
                    path.resolve(__dirname, './../')
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                nodeModulesPath: '\'~\'',
                                coreModulePath: '\'~\''
                            },
                            include: path.resolve(__dirname, '../')
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    { loader: 'html-loader' },
                    { loader: 'file-loader' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react' // eslint-disable-line quote-props
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors'
        })
    ],
    resolve: {
        plugins: [
            new DirectoryNamedWebpackPlugin({
                honorPackage: ['jsnext:main']
            })
        ]
    }
};

WebpackConfig.devServer = {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, './../'), path.join(__dirname, './../../packages/')],
    watchContentBase: true
};
WebpackConfig.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
};

module.exports = WebpackConfig;
