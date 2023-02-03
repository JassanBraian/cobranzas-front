import { useEffect, useContext } from 'react';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import { Table } from 'react-bootstrap';

const AlumSearched = () => {

    const { currentAlumno, clearCurrentAlumno } = useContext(AlumnoContext);

    useEffect(() => {
        clearCurrentAlumno();
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
                        <th>Porc. Beca</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentAlumno.legajo ?
                            <tr>
                                <td> {1} </td>
                                <td> {currentAlumno.apellido} </td>
                                <td> {currentAlumno.nombre} </td>
                                <td> {currentAlumno.dni} </td>
                                <td> {currentAlumno.legajo} </td>
                                <td> {currentAlumno.porcBeca}% </td>
                            </tr>
                            :
                            <tr>
                                <td colSpan={6} className="text-center">
                                    Aun no se ha seleccionado un Alumno
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    );
};

export default AlumSearched;