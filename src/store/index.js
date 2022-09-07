import {
  createStore,
  applyMiddleware,
  // combineReducers,
} from '../redux-nut/index';
import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

export function countReducer(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'DELETE':
      return state - 1;
    default:
      return state;
  }
}

// 我们在applyMiddleware文件中执行中间件时传入的参数就是这两个，忘了回去看看
function logger({ dispatch, getState }) {
  // 这里的next就是dispatch方法
  return (next) => {
    return (action) => {
      console.log('----------');
      console.log(action, 'action');
      console.log('preState', getState());

      // 修改状态值，即使用dispatch来修改store
      next(action);

      console.log('nextState', getState());
      console.log('----------');
    };
  };
}

function thunk({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      } else {
        return next(action);
      }
    };
  };
}

const store = createStore(
  combineReducers({
    count: countReducer,
  }),
  applyMiddleware(
    thunk
    // logger
  )
);

export default store;
