import { useContext, useEffect } from 'react';
import AlumCarreraContext from '../../../context/alumCarrera/AlumCarreraContext';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import { Table } from 'react-bootstrap';

const AlumCarrList = () => {

    const { alumnosCarreras, getAlumCarrerasByAlumId } = useContext(AlumCarreraContext);
    const { currentAlumno } = useContext(AlumnoContext);

    useEffect(() => {
        //currentAlumno.id && getAlumCarrerasByAlumId(currentAlumno.id);
    }, [currentAlumno]);

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Cantidad Cuotas</th>
                    <th>Precio Cuota</th>
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
                            </tr>
                        )
                        :
                        <tr>
                            <td colSpan={4} className="text-center">
                                El Alumno seleccionado no está inscripto a alguna Carrera
                            </td>
                        </tr>
                }
            </tbody>
        </Table>
    );
};

export default AlumCarrList;