import React, { useEffect, useLayoutEffect, useReducer } from 'react';

function reducer1(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'delete':
      return state - 1;
    default:
      return state;
  }
}

function UseReduceDemo() {
  const [state, dispatch] = useReducer(reducer1, 0);
  useEffect(() => {
    console.log('useEffect');
  }, []);
  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, 'useLayoutEffect');
  return (
    <div>
      <button onClick={() => dispatch({ type: 'add' })}>加</button>
      {state}
      <button onClick={() => dispatch({ type: 'delete' })}>减</button>
    </div>
  );
}

export default UseReduceDemo;
