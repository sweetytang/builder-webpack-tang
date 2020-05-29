const glob = require('glob-all'); // 需要绝对路径作为参数
const path = require('path');

describe('Checking generated css js files', () => {  // eslint-disable-line
  it('should generate css js files', (done) => {   // eslint-disable-line
    const files = glob.sync([
      path.join(__dirname, 'template/dist/index_*.js'),
      path.join(__dirname, 'template/dist/search_*.js'),
      path.join(__dirname, 'template/dist/index_*.css'),
      path.join(__dirname, 'template/dist/search_*.css'),
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no css js files generate');
    }
  });
});
