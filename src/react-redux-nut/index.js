import React, { useLayoutEffect, useReducer } from 'react';
import store from '../store';

// context跨组件传值
// 1 创建context
const Context = React.createContext();

// 2. provider传递value
function Provider(props) {
  const { store, children } = props;
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
// 3 后代组件消费provider传递的value，三种使用方式
// useContext   只能用在函数组件和自定义hook中
// Consumer     没有组件限制，注意使用方式
// contextType  只能用在类组件中，只能订阅单一的context来源

const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (props) => {
    const { getState, dispatch, subscribe } = store;
    const stateProps = mapStateToProps(getState());
    const dispatchProps = { dispatch };

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
      return () => {
        unsubscribe();
      };
    }, []);
    console.log(stateProps, 'stateProps');
    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
  };

export { Provider, connect };
