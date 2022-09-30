// import { createStore } from 'redux';
import { createStore } from '../redux-ym';
import applyMiddleware from '../redux-ym/applyMiddleware';
import combineReducers from '../redux-ym/combineReducers';

const initialState = {
  count: 0,
};

// reducer是一个纯纯的函数，接受旧的state和action（包含类型和参数）,返回一个新的state
function reducer(state = initialState, action) {
  const { type, params } = action;
  switch (type) {
    case 'ADD':
      return { ...state, ...params, count: state.count + 1 };
    case 'DELETE':
      return { ...state, ...params, count: state.count - 1 };
    default:
      return state;
  }
}

function logger({ getState, dispatch }) {
  return (next) => {
    console.log(next, 'next');
    return (action) => {
      console.log('----------');
      console.log(action, 'action');
      console.log('preState', getState());
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
      }
      return next(action);
    };
  };
}

const store = createStore(
  combineReducers({ count: reducer }),
  applyMiddleware(logger, thunk)
);

export default store;
