import './App.css';
import ReduxPage from './pages/reduxPage.js';
import HooksPage from './pages/HooksPage';
import ReactReduxPage from './pages/ReactReduxPage';

function App() {
  return (
    <div className="App">
      <ReduxPage />
      <HooksPage />
      <ReactReduxPage omg={0} />
    </div>
  );
}

export default App;
