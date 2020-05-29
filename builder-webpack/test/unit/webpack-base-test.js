
const assert = require('assert');
const baseConfig = require('../../lib/webpack.base.js');

describe('webpack.base.js test case', () => { // eslint-disable-line

  console.log(baseConfig); // eslint-disable-line
  it('entry', () => { // eslint-disable-line
    assert.deepEqual(baseConfig.entry,
      {
        index: 'C:/Users/18139/Desktop/webpacktest/builder-webpack/test/smoke/template/src/index/index.js',
        search: 'C:/Users/18139/Desktop/webpacktest/builder-webpack/test/smoke/template/src/search/index.js',
      });
    }); // eslint-disable-line
});
