import { useContext, useState, useEffect } from 'react';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import AlumnoItem from './AlumnoItem';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import AddAlumnoModal from '../modals/AddAlumnoModal';
import EditAlumnoModal from '../modals/EditAlumnoModal';
import DeleteAlumnoModal from '../modals/DeleteAlumnoModal';

const AlumnoList = () => {

    const { alumnos, getAlumnos } = useContext(AlumnoContext);

    const [showAddAlumnoModal, setShowAddAlumnoModal] = useState(false);
    const [showEditAlumnoModal, setShowEditAlumnoModal] = useState(false);
    const [showDeleteAlumnoModal, setShowDeleteAlumnoModal] = useState(false);

    useEffect(() => {
        getAlumnos();
    }, []);

    const openEditModal = () => {
        setShowEditAlumnoModal(true);
    };

    const openDeleteModal = () => {
        setShowDeleteAlumnoModal(true);
    };

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Alumnos</h3>
                </div>
                <div className="col-6 d-flex justify-content-end mb-1">
                    <Button
                        variant="success"
                        onClick={() => setShowAddAlumnoModal(true)}
                    >
                        <FontAwesomeIcon icon={faAdd} />
                    </Button>
                </div>
            </div>

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
                                <AlumnoItem
                                    alumno={alumno}
                                    key={index}
                                    index={index}
                                    openEditModal={openEditModal}
                                    openDeleteModal={openDeleteModal}
                                />
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

            <AddAlumnoModal
                show={showAddAlumnoModal}
                onHide={() => setShowAddAlumnoModal(false)}
            />

            <EditAlumnoModal
                show={showEditAlumnoModal}
                onHide={() => setShowEditAlumnoModal(false)}
            />

            <DeleteAlumnoModal
                show={showDeleteAlumnoModal}
                onHide={() => setShowDeleteAlumnoModal(false)}
            />
        </>
    );
};

export default AlumnoList;