
const merge = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩另外打包的css包，webpack默认只压缩js包
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin'); // 公共资源包提取成CDN形式
const CssNano = require('cssnano');
const baseConfig = require('./webpack.base.js'); // 基础配置

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: CssNano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16.7.0/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: { // 内置的splitChunksPlugin用于打包公共文件，推荐使用，不推荐用html-webpack-externals-plugin(只是换成cdn方式)
      minSize: 0, // 打包文件的大小条件,单位bytes
      cacheGroups: {
        commons: {
          test: /common/, // 匹配的打包文件正则匹配条件
          name: 'commons', // 打包出的文件名
          chunks: 'all', // 打包的文件引用条件：异步还是同步或都打包
          minChunks: 1, // 打包文件的引用次数条件
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
