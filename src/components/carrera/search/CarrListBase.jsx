import { useContext, useEffect } from 'react';
import AlumCarreraContext from '../../../context/alumCarrera/AlumCarreraContext';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import CarreraContext from '../../../context/carrera/CarrerasContext';

const CarrListBase = ({ closeSearchModal }) => {

    const { alumnosCarreras, clearAlumCarreras, getAlumCarrerasByAlumId } = useContext(AlumCarreraContext);
    const { currentAlumno } = useContext(AlumnoContext);
    const { getCarrera } = useContext(CarreraContext);

    useEffect(() => {
        clearAlumCarreras();
    }, [])

    useEffect(() => {
        getAlumCarrerasByAlumId(currentAlumno.id);
    }, [currentAlumno])


    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Cantidad Cuotas</th>
                    <th>Precio Cuota</th>
                    <th className='text-center'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    alumnosCarreras ?
                        alumnosCarreras.map((alumCarr, index) =>
                            <tr>
                                <td> {index + 1} </td>
                                <td> {alumCarr.carrera.descripcion} </td>
                                <td> {alumCarr.carrera.cantCuotas} </td>
                                <td> ${alumCarr.carrera.precioCuo} </td>
                                <td className="text-center">
                                    <Button
                                        variant="warning"
                                        className='me-2'
                                        onClick={() => {
                                            getCarrera(alumCarr.fkCarrera);
                                            closeSearchModal();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faHandPointer} />
                                    </Button>
                                </td>
                            </tr>
                        )
                        :
                        <tr>
                            <td colSpan={4} className="text-center">
                                No hay carreras cargadas
                            </td>
                        </tr>
                }
            </tbody>
        </Table>
    );
};

export default CarrListBase;