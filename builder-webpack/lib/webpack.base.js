
const glob = require('glob'); // 多页面搜索包
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包前清理
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTML打包，webpack默认只能打包js文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css单独打包
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 命令行日志优化插件
const AutoPrefixer = require('autoprefixer'); // 浏览器兼容性，自动补齐css前缀

const projectRoot = path.join(__dirname, '../test/smoke/template'); // 将入口路径改为template目录

const setMAP = () => { // setMAP用于多页面打包
  const entry = {};
  const HtmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, 'src/*/index.js'));
  entryFiles.map((item) => {
    const entryFile = item.match(/src\/(.*)\/index\.js/);
    const pageName = entryFile && entryFile[1];

    entry[pageName] = item; // 相对entry[pageName] = `./${entryFile[0]}`或者entry[pageName]=item;绝对路径
    return HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vender', 'common', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const { entry, HtmlWebpackPlugins } = setMAP();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist/'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                AutoPrefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          'less-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecesion: 8,
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              filename: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    function errorPlugin() { // 打包错误捕获及自处理，webpack4自动内置了一套处理流程
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error'); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(HtmlWebpackPlugins),
  stats: 'errors-only', // 日志显示调节
};
