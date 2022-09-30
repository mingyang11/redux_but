// 接收两个参数，一个是reducer，一个是applyMiddleware的执行结果，传的是中间件
function createStore(reducer, enhancer) {
  // TODO enhancer加强的是dispatch，而dispatch是来自于creastore，所以下面要这样写，反正我还不懂
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  // 初始化声明一个state值，这个也可以在参数中传入，这个暂时不重要
  let currentState;
  const currentListeners = [];
  // 获取当前store中的state值
  function getState() {
    return currentState;
  }

  //   分发，改变state的值，它接收一个参数，参数约定和reducer中的一样，包含type和其他参数，type是必填，eg: {type: 'ADD', param?: {name: 'hel'}}
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 在dispatch时执行所有listenr，更新页面
    currentListeners.forEach((listener) => {
      listener();
    });
  }

  //  订阅，感觉只有单独使用的时候这个函数才有作用，配合react-redux使用的时候就没啥用了
  //   初始化时注册监听事件，当store变化时可以自动执行listener回调函数
  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      // 返回一个函数，将该订阅事件从store中删除
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  // 创建creaStore时需要先执行一遍，不然不能通过reducer给默认值，因此在页面中获取的store中的初始值会报错
  dispatch({ type: 'DEFAULT/TYPE' });

  // 首先确定三个返回的方法
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore;
