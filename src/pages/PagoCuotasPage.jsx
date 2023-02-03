import SearchAlumPanel from '../components/alumno/search/SearchAlumPanel';
import SearchCarrPanel from '../components/carrera/search/SearchCarrPanel';
import CuotaList from '../components/cuota/base/CuotaList';
import '../css/common/base-page.css';

const PagoCuotasPage = () => {
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