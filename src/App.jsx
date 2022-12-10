import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ParentContext from './context/ParentContext';
import Home from './pages/Home';
import CarrerasPage from './pages/CarrerasPage';
import Layout from './components/common/Layout';

function App() {
  return (
    <>
      <ParentContext>
        <Router>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/carreras' element={<CarrerasPage />} />
            </Routes>
          </Layout>
        </Router>
      </ParentContext>
    </>
  );
}

export default App;
