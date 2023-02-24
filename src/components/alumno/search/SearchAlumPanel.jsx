import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import SearchAlumModal from './SearchAlumModal';
import AlumSearched from './AlumSearched';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import AlumCarreraContext from '../../../context/alumCarrera/AlumCarreraContext';

const SearchAlumno = () => {

    const { getAlumCarrerasByAlumId } = useContext(AlumCarreraContext);
    const { currentAlumno } = useContext(AlumnoContext);

    const [showSearchAlumModal, setShowSearchAlumModal] = useState(false);

    useEffect(() => {
        console.log(currentAlumno)
        currentAlumno.id && getAlumCarrerasByAlumId(currentAlumno.id);
    }, [currentAlumno]);

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Seleccionar Alumno</h3>
                </div>
                <div className="col-6 d-flex justify-content-end mb-1">
                    <Button
                        variant="success"
                        onClick={() => setShowSearchAlumModal(true)}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </div>
            </div>

            <AlumSearched />

            <SearchAlumModal
                show={showSearchAlumModal}
                onHide={() => setShowSearchAlumModal(false)}
            />
        </>
    );
};

export default SearchAlumno;