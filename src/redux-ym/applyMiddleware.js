import compose from './compose';

// apply接受的是一个个中间件，因为在creastore中使用了enhancer(creastore)(reducer)可以知道它的第一个返回参数是creasstore，第二个返回的参数是reudcer
export default function applyMiddleware(...middlewares) {
  // 可以通过在creastore中传入的参数creastore和reducer来生成一个store
  return (createStore) => {
    return (reducer) => {
      // 使用creastore和reducer生成store
      const store = createStore(reducer);
      let dispatch = store.dispatch;
      const middleApi = {
        getState: store.getState,
        // 这里不能直接使用dispatch，原因是如果直接使用dispatch则会使用store中原版的dispatch，且每次执行的时候都是原版的dispatch，起不到加强的作用
        //使用中间件加强的原理是将上一次中间件执行过的dispatch传递到下一个中间件，而不是每次都传过去一个新的dispatch,这样起不到加强的作用
        dispatch: (actions, ...args) => dispatch(actions, ...args),
      };
      // 生成加强版的中间件函数，使中间件拿到权限，不然它执行啥
      const middleWareChain = middlewares.map((middleware) => {
        return middleware(middleApi);
      });
      //  加强版的dispatch
      // 把所有的加强版的中间件函数都执行了。
      //   同时还执行了store.dispatch(原版的dispatch)，修改store值还是想要使用原版的dispatch来进行修改
      dispatch = compose(...middleWareChain)(store.dispatch);
      // console.log(compose(...middleWareChain)(store.dispatch));
      return { ...store, dispatch };
    };
  };
}
