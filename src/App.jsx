import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ParentContext from './context/ParentContext';
import Home from './pages/Home';

function App() {
  return (
    <>
      <ParentContext>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </ParentContext>
    </>
  );
}

export default App;
