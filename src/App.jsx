import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ParentContext from './context/ParentContext';
import Home from './pages/Home';
import CarrerasPage from './pages/CarrerasPage';
import Layout from './components/common/Layout';
import AlumnosPage from './pages/AlumnosPage';
import PagoCuotasPage from './pages/PagoCuotasPage';

function App() {
  return (
    <>
      <ParentContext>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/carreras' element={<CarrerasPage />} />
              <Route path='/alumnos' element={<AlumnosPage />} />
              <Route path='/cuotas' element={<PagoCuotasPage />} />
            </Routes>
          </Layout>
        </Router>
      </ParentContext>
    </>
  );
}

export default App;
