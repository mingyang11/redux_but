import './App.css';
import ReduxPage from './pages/reduxPage.js';
import HooksPage from './pages/HooksPage';
import ReactReduxPage from './pages/ReactReduxPage';
import ReactReduxHookPage from './pages/ReactReduxHookPage';

function App() {
  return (
    <div className="App">
      {/* <ReduxPage />
      <HooksPage />
      <ReactReduxPage omg={0} /> */}
      <ReactReduxHookPage />
    </div>
  );
}

export default App;
