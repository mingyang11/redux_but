export default function combineReducers(reducers) {
  // 返回一个总的reducer，（prevState, action） => newState
  return function combination(state = {}, action) {
    let nextState = {};
    let hasChanged = false;

    // 循环修改reducer，然后更新state的值
    for (const key in reducers) {
      const reducer = reducers[key];
      nextState[key] = reducer(state[key], action);
      //   判断值前后是否发生了改变，改变了就可以更新页面了
      hasChanged = hasChanged || nextState[key] !== state[key];
    }

    // 判断state的数量是否发生变化，发生变化了就代表页面可以更新
    hasChanged = hasChanged || Object.length(nextState) !== Object.keys(state);

    return hasChanged ? nextState : state;
  };
}
