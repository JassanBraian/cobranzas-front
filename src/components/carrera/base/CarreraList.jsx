import { useContext, useEffect, useState } from 'react';
import CarreraContext from '../../../context/carrera/CarrerasContext';
import CarreraItem from './CarreraItem';
import { Table, Button } from 'react-bootstrap';
import AddCarreraModal from '../modals/AddCarreraModal';
import EditCarreraModal from '../modals/EditCarreraModal';
import DeleteCarreraModal from '../modals/DeleteCarreraModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import HistoryPrecioCuoModal from '../../preciocuota/modals/HistoryPrecioCuoModal';

const CarreraList = () => {
    const { getCarreras, carreras } = useContext(CarreraContext);
    const [showAddCarreraModal, setShowAddCarreraModal] = useState(false);
    const [showEditCarreraModal, setShowEditCarreraModal] = useState(false);
    const [showDeleteCarreraModal, setShowDeleteCarreraModal] = useState(false);
    const [showHistoryPrecioCuoMod, setShowHistoryPrecioCuoMod] = useState(false);

    useEffect(() => {
        getCarreras();
    }, [])

    const openEditModal = () => {
        setShowEditCarreraModal(true);
    };

    const openDeleteModal = () => {
        setShowDeleteCarreraModal(true);
    };

    const openHistoryPrecioCuoMod = () => {
        setShowHistoryPrecioCuoMod(true);
    };

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Carreras</h3>
                </div>
                <div className="col-6 d-flex justify-content-end mb-1">
                    <Button
                        variant="success"
                        onClick={() => setShowAddCarreraModal(true)}
                    >
                        <FontAwesomeIcon icon={faAdd} />
                    </Button>
                </div>
            </div>

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
                        carreras ?
                            carreras.map((carrera, index) =>
                                <CarreraItem
                                    carrera={carrera}
                                    key={index}
                                    index={index}
                                    openEditModal={openEditModal}
                                    openDeleteModal={openDeleteModal}
                                    openHistoryPrecioCuoMod={openHistoryPrecioCuoMod}
                                />
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

            <AddCarreraModal
                show={showAddCarreraModal}
                onHide={() => setShowAddCarreraModal(false)}
            />

            <EditCarreraModal
                show={showEditCarreraModal}
                onHide={() => setShowEditCarreraModal(false)}
            />

            <DeleteCarreraModal
                show={showDeleteCarreraModal}
                onHide={() => setShowDeleteCarreraModal(false)}
            />

            <HistoryPrecioCuoModal
                show={showHistoryPrecioCuoMod}
                onHide={() => setShowHistoryPrecioCuoMod(false)}
            />

        </>
    );
};

export default CarreraList;