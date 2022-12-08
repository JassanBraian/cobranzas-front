import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ParentContext from './context/ParentContext';
import Home from './pages/Home';
import CarrerasPage from './pages/CarrerasPage';

function App() {
  return (
    <>
      <ParentContext>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/carreras' element={<CarrerasPage />} /> 
          </Routes>
        </Router>
      </ParentContext>
    </>
  );
}

export default App;
