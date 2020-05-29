const glob = require('glob-all'); // 需要绝对路径作为参数
const path = require('path');

describe('Checking generated html files', () => {    // eslint-disable-line
  it('should generate html files', (done) => {    // eslint-disable-line
    const files = glob.sync([
      path.join(__dirname, 'template/dist/index.html'),
      path.join(__dirname, 'template/dist/search.html'),
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no html files generate');
    }
  });
});
