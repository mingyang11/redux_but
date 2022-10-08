import './App.css';
import ReduxPage from './pages/reduxPage.js';
import HooksPage from './pages/HooksPage';
import ReactReduxPage from './pages/ReactReduxPage';
import ReactReduxHookPage from './pages/ReactReduxHookPage';
import ReduxPageDemo from './pages/reduxPageDemo';
import ReactReduxPageDemo from './pages/ReactReduxPageDemo';

function App() {
  return (
    <div className="App">
      {/* <ReduxPage />
      <HooksPage /> */}
      {/* <ReactReduxPage omg={0} /> */}
      {/* <ReactReduxHookPage /> */}
      <ReactReduxPageDemo />
    </div>
  );
}

export default App;
