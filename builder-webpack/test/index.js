
const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template')); // 改变工作目录，老师需要，我的代码不需要

describe('builder-webpack test case', () => { // eslint-disable-line
  require('./unit/webpack-base-test.js'); // eslint-disable-line
});
