import { createStore, applyMiddleware } from '../redux-nut/index';
// import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function countReducer(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'DELETE':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;
