import { useReducer } from 'react';
import { countReducer } from '../store/index';

export default function HooksPage() {
  const [state, dispatch] = useReducer(countReducer, 0);
  return (
    <div>
      <h3>Hooks Page</h3>
      <button onClick={() => dispatch({ type: 'ADD' })}>{state}</button>
    </div>
  );
}
