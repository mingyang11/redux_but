import React, { Component } from 'react';
import store from '../store';

export default class ReduxPage extends Component {
  componentDidMount() {
    //   订阅store,一旦store发生变化执行强制渲染
    this.unregister = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    //   卸载订阅
    // this.unregister();
  }
  add = () => {
    store.dispatch({ type: 'ADD' });
  };
  delete = () => {
    //! 这是将异步放到dispatch中，而不是将dispatch放入异步中(将dispatch放入异步中其实和同步没啥区别，但是将异步放到同步中区别可就大了)
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'DELETE' });
      }, 1000);
    });
  };
  render() {
    return (
      <div>
        <h3>{store.getState().count}</h3>
        <button onClick={this.add}>加</button>
        <button onClick={this.delete}>减</button>
      </div>
    );
  }
}
