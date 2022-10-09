import React, {
  useContext,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import bindActionCreators from '../redux-ym/bindActionCreators';
import store from '../store-ym';

// 使用context三步走
// 1.创建context
const Context = React.createContext();
// 2.通过provider组件传递stor
// Provider在应用的顶部，通过context属性将store传递给所有子组件来使用
function Provider(props) {
  const { store, children } = props;
  return <Context.Provider value={store}>{children}</Context.Provider>;
}
// ! 3.在子组件中消费
// * contextType 只能用在类组件，只能订阅单一的context来源
// * useContext 只能用在类组件或者自定义Hook中
// * Consumer 没有组件限制，注意使用方式

function connect(mapStateToProps, mapDispatchToProps) {
  return (WrappedComponent) => {
    return (props) => {
      const { getState, dispatch, subscribe } = store;
      const forceUpdate = useForceUpdate();
      let dispatchProps = { dispatch };
      let stateProps;
      if (mapStateToProps) {
        stateProps = mapStateToProps(getState());
      } else {
        stateProps = getState();
      }
      if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch);
      } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      }

      useLayoutEffect(() => {
        //   这里借助初始化是将forceupdate放进createStore中的linstener中，当dispatch触发的时候就会更新该forceUpdate
        // foceUpdate执行后机会改变state，页面机会刷新afs
        const unsubscribe = subscribe(() => {
          forceUpdate();
        });
        return () => {
          unsubscribe();
        };
      }, [subscribe]);

      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}

const useForceUpdate = () => {
  const [_, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
};

// useSelector获取state
const useSelector = (selector) => {
  const { getState, subscribe } = store;
  const forceUpdate = useForceUpdate();
  let selectedState;
  if (selector) {
    selectedState = selector(getState());
  } else {
    selectedState = getState();
  }

  useLayoutEffect(() => {
    //   这里借助初始化是将forceupdate放进createStore中的linstener中，当dispatch触发的时候就会更新该forceUpdate
    // foceUpdate执行后机会改变state，页面机会刷新
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, [subscribe]);

  return selectedState;
};

const useDispatch = () => {
  const { dispatch } = store;
  return dispatch;
};

export { Provider, connect, useDispatch, useSelector };
