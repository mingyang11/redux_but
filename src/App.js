import './App.css';
import ReduxPage from './pages/reduxPage.js';
import HooksPage from './pages/HooksPage';
import ReactReduxPage from './pages/ReactReduxPage';

function App() {
  return (
    <div className="App">
      <ReduxPage />
      <HooksPage />
      <ReactReduxPage />
    </div>
  );
}

export default App;
