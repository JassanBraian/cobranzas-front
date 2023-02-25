import { useContext, useEffect } from 'react';
import AlumCarreraContext from '../../../context/alumCarrera/AlumCarreraContext';
import { Table, Button } from 'react-bootstrap';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import CuotaContext from '../../../context/cuota/CuotaContext';

const CarrDispList = () => {

    const { addAlumCarrera, carrerasDispAlum, getAlumCarrDispByAlumId } = useContext(AlumCarreraContext);
    const { currentAlumno } = useContext(AlumnoContext);
    const { addCuota } = useContext(CuotaContext);

    useEffect(() => {
        currentAlumno.id && getAlumCarrDispByAlumId(currentAlumno.id);
    }, [currentAlumno]);

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
                    carrerasDispAlum && carrerasDispAlum.length > 0 ?
                        carrerasDispAlum.map((carrera, index) =>
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {carrera.descripcion} </td>
                                <td> {carrera.cantCuotas} </td>
                                <td> ${carrera.precioCuo} </td>
                                <td className="text-center">
                                    <Button
                                        variant="success"
                                        className='me-2'
                                        onClick={() => {
                                            const alumCarr = {
                                                fkAlumno: currentAlumno.id,
                                                fkCarrera: carrera.id
                                            }
                                            addAlumCarrera(alumCarr);
                                            addCuota(currentAlumno.id, carrera.id);
                                        }}
                                    >
                                        Inscribir
                                    </Button>
                                </td>
                            </tr>
                        )
                        :
                        <tr>
                            <td colSpan={5} className="text-center">
                                El Alumno seleccionado se encuentra inscripto a todas las Carreras disponibles
                            </td>
                        </tr>
                }
            </tbody>
        </Table>
    );
};

export default CarrDispList;

