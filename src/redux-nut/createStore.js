// createStore接收两个参数，一个是reducer,一个是applyMiddleWare的执行结果(就是一个加强器)
function createStore(reducer, enhancer) {
  // enhancer加强的是dispatch，且dispach是来自store的，就是createStore(),所以下面要这么写(但是我还是不懂)
  if (enhancer) {
    // 函数柯里化的思想
    return enhancer(createStore)(reducer);
  }
  let currentState;
  const currentListeners = [];
  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 这里全部执行的优点与缺点
    // 有优点：比如存在兄弟组件，改变兄的状体啊后，弟的状态也可以随之改变(还是全部执行改遍的好)
    // 缺点：有可能有些组件不需要改动啥的，会造成浪费
    currentListeners.forEach((listener) => {
      listener();
    });
  }
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }
  dispatch({ type: 'DEFAULT/TYPE' });
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore;
