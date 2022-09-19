// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../react-redux-nut';

export default function ReactReduxHookPage(props) {
  const count = useSelector(({ count }) => count);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <button
        onClick={() => {
          dispatch({ type: 'ADD' });
        }}
      >
        {count}
      </button>
    </div>
  );
}
