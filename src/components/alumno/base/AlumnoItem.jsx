import React from 'react';
import { useContext } from 'react';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faI } from "@fortawesome/free-solid-svg-icons";

const AlumnoItem = ({ alumno, index, openEditModal, openDeleteModal, openInscripModal }) => {

    const { getAlumno } = useContext(AlumnoContext);

    return (
        <>
            <tr>
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
                        variant="primary"
                        className='me-2'
                        onClick={() => {
                            getAlumno(alumno.id);
                            openInscripModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faI} />
                    </Button>
                    <Button
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                            getAlumno(alumno.id);
                            openEditModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            getAlumno(alumno.id);
                            openDeleteModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default AlumnoItem;