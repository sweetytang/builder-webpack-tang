// 构建一个express服务器，提供SSR服务

if (typeof window === 'undefined') { // hack,因为服务端没有window对象
  global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server'); // renderToString在服务端对js进行字符串化
const SSR = require('../dist/search-server.js');

const template = fs.readFileSync(path.join(__dirname, '../dist/search.html'), 'utf-8'); // SSR的html模板,使用浏览器端打包出来的html模板，这样样式问题可解决。
const data = require('./data.json'); // SSR获取数据

function server(port) {
  const app = express();
  app.use(express.static('dist'));

  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    res.status(200).send(html);
  });

  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data); // 创建返回的html页面
  return template.replace('<!--HTML_PLACEHOLD-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLD-->', `<script>window._initial_data=${dataStr}</script>`);
};
