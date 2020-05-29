const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');
const prodConfig = require('../../lib/webpack.prod.js'); // 引入基础配置

const mocha = new Mocha({
  timeout: '10000ms',
});

// process.chdir(path.join(__dirname, 'template'));

rimraf('./template/dist', () => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);      //eslint-disable-line
      process.exit(2);
    }
    console.log(stats.toString({   //eslint-disable-line
      colors: true,
      modules: false,
      children: false,
    }));

    console.log('Webpack build success, start run test.'); // eslint-disable-line
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));

    mocha.run();
  });
});
