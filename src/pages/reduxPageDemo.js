import React from 'react';
import store from '../store-ym';

// 单独使用store时由于不是props值或者state值发生改变，因此不会执行渲染，这是需要用到方法this.forceUpdate来进行强制渲染
class ReduxPageDemo extends React.Component {
  // 返回一个清楚监听的函数
  componentDidMount() {
    // 初始化时给store加入监听，当store发生变化时强制渲染
    this.unsubscribe = store.subscribe(() => {
      // 这里加了强制更新后在dispatch时也会执行，效果其实和点击的时候加入强制更新代码是一样的
      this.forceUpdate();
    });
  }
  // 执行清除监听的函数，从store的listener中清除该监听事件
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const state = store.getState();
    return (
      <div>
        <h2>ReduxPageDemo</h2>
        <button
          onClick={() => {
            store.dispatch({ type: 'ADD' });
          }}
        >
          加➕{state.count}
        </button>
        <button
          onClick={() => {
            store.dispatch({ type: 'DELETE' });
          }}
        >
          减➖{state.count}
        </button>
      </div>
    );
  }
}

export default ReduxPageDemo;
