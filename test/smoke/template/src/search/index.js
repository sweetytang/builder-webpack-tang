
import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import largeNumber from 'large-number-sweetytang'; // 测试webpack打包组件包，上传npm；
import cat from './images/cat.jpg';
import { a, b } from './tree-shaking'; // 测试Tree-Shaking（摇树优化）

if (false) { // 测试Tree-Shaking,mode:production 默认开启
  a();
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null,
    };
    this.loadImport = this.loadImport.bind(this);
  }

  loadImport() {
    import('./text.js').then((Text) => { // 动态import加载，可以分割代码
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    const largeSum = largeNumber('999', '1');
    return (
      <div className="search-text">
        {
                Text ? <Text /> : null
            }
        { largeSum }
        搜索文字的内容
        <img src={cat} onClick={this.loadImport} />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById('root'));
