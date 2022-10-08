// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../react-redux-ym';

export default function ReactReduxHookPageDemo() {
  // const count = useSelector(({ count }) => count);
  const state = useSelector();
  const dispatch = useDispatch();
  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <button
        onClick={() => {
          dispatch({ type: 'ADD' });
        }}
      >
        {state?.count}
        增加
      </button>
    </div>
  );
}
