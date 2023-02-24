import { useContext, useEffect } from 'react';
import SearchAlumPanel from '../components/alumno/search/SearchAlumPanel';
import SearchCarrPanel from '../components/carrera/search/SearchCarrPanel';
import CuotaList from '../components/cuota/base/CuotaList';
import '../css/common/base-page.css';
import AlumnoContext from '../context/alumno/AlumnoContext';
import CarreraContext from '../context/carrera/CarrerasContext';
import AlumCarreraContext from '../context/alumCarrera/AlumCarreraContext';
import CuotaContext from '../context/cuota/CuotaContext';

const PagoCuotasPage = () => {
    const { clearCurrentAlumno } = useContext(AlumnoContext);
    const { clearCurrentCarrera } = useContext(CarreraContext);
    const { clearAlumCarreras } = useContext(AlumCarreraContext);
    const { clearCuotas } = useContext(CuotaContext);

    useEffect(() => {
        clearCurrentCarrera();
        clearCurrentAlumno();
        clearAlumCarreras();
        clearCuotas();
    }, []);

    return (
        <>
            <div className='app'>
                <SearchAlumPanel />

                <SearchCarrPanel />

                <CuotaList />
            </div>
        </>
    );
};

export default PagoCuotasPage;