// import { createStore } from 'redux';
import { createStore } from '../redux-ym';

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

const store = createStore(reducer);

export default store;
