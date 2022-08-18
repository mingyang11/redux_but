import { compose } from './index';
// applyMiddleware接收的是一个个中间件
export default function applyMiddleware(...middlewares) {
  // 1.applymiddleware就是一个加强函数，在createStore中执行时传入了createStore和reducer
  // 2.通过这两个参数可以直接生成一个store

  //   createStore方法
  return (createStore) => {
    //   createStore接收的reudcer参数
    return (reducer) => {
      // 通过createStore和reducer生成store
      const store = createStore(reducer);
      //   拿到dispatch
      let dispatch = store.dispatch;
      //   将
      const midApi = {
        getState: store.getState,
        // 这里不能直接使用dispatch,因为如果直接使用dispatch则使用的是上面原版的dipatch，且每次中间件执行的时候都是原版的dipathc
        // 起不了加强的作用(原理是上一个中间件执行完成之后应该将执行过的dispatch传递给下一个中间件，而不是每次都传递新的dispatch进去)
        // 这里这样写只是为了在中间件执行的时候获取当前上下文的dispatch
        dispatch: (action, ...args) => dispatch(action, ...args),
      };

      //   生成加强版的中间件函数，使中间件拿到权限，不然他执行啥的？
      const middleWareChain = middlewares.map((middleware) =>
        middleware(midApi)
      );
      //  加强版的dispatch
      // 把所有的加强版的中间件函数都执行了。
      //   同时还执行了store.dispatch(原版的dispatch)，修改store值还是想要使用原版的dispatch来进行修改
      dispatch = compose(...middleWareChain)(store.dispatch);
      return { ...store, dispatch };
    };
  };
}
