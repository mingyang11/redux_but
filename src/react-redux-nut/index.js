import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import { bindActionCreators } from '../redux-nut';
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
    let dispatchProps = { dispatch };
    const forceUpdate = useForceUpdate();

    if (typeof mapDispatchToProps === 'function') {
      dispatchProps = mapDispatchToProps(dispatch);
    } else if (typeof mapDispatchToProps === 'object') {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }
    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate();
      });
      return () => {
        unsubscribe();
      };
    }, [subscribe]);
    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
  };

const useForceUpdate = () => {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
};

const useSelector = (selector) => {
  const store = useContext(Context);
  const forceUpdate = useForceUpdate();

  const { getState, subscribe } = store;
  let selectedState;
  if (selector) {
    selectedState = selector(getState());
  } else {
    selectedState = getState();
  }

  useLayoutEffect(() => {
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
  const store = useContext(Context);
  const { dispatch } = store;
  return dispatch;
};
export { Provider, connect, useDispatch, useSelector };
