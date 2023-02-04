import { useEffect, useContext } from 'react';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

const AlumListBase = ({ closeSearchModal }) => {

    const { alumnos, getAlumnos, getAlumno } = useContext(AlumnoContext);

    useEffect(() => {
        getAlumnos();
    }, []);

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Apellido</th>
                        <th>Nombre</th>
                        <th>Dni</th>
                        <th>Legajo</th>
                        <th>Mail</th>
                        <th>Porc. Beca</th>
                        <th>Fecha Ingreso</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alumnos ?
                            alumnos.map((alumno, index) =>
                                <tr key={index}>
                                    <td> {index + 1} </td>
                                    <td> {alumno.apellido} </td>
                                    <td> {alumno.nombre} </td>
                                    <td> {alumno.dni} </td>
                                    <td> {alumno.legajo} </td>
                                    <td> {alumno.mail} </td>
                                    <td> {alumno.porcBeca}% </td>
                                    <td> {alumno.fechaIngreso} </td>
                                    <td className="text-center">
                                        <Button
                                            variant="warning"
                                            className='me-2'
                                            onClick={() => {
                                                getAlumno(alumno.id);
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
                                    No posee alumnos cargados
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    );
};

export default AlumListBase;