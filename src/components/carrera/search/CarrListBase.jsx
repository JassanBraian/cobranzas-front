import { useContext } from 'react';
import AlumCarreraContext from '../../../context/alumCarrera/AlumCarreraContext';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import CarreraContext from '../../../context/carrera/CarrerasContext';

const CarrListBase = ({ closeSearchModal }) => {

    const { alumnosCarreras } = useContext(AlumCarreraContext);
    const { getCarrera } = useContext(CarreraContext);    

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
                    alumnosCarreras && alumnosCarreras.length > 0 ?
                        alumnosCarreras.map((alumCarr, index) =>
                            <tr key={index}>
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
                            <td colSpan={5} className="text-center">
                                El Alumno seleccionado no está inscripto a alguna Carrera
                            </td>
                        </tr>
                }
            </tbody>
        </Table>
    );
};

export default CarrListBase;