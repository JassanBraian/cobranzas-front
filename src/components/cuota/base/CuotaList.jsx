import { useState, useEffect, useContext } from 'react';
import EditCuotaModal from '../modals/EditCuotaModal';
import DeleteCuotaModal from '../modals/DeleteCuotaModal';
import CuotaContext from '../../../context/cuota/CuotaContext';
import { Table } from 'react-bootstrap';
import CuotaItem from './CuotaItem';

const CuotaList = () => {

    const { getCuotas, cuotas } = useContext(CuotaContext);
    const [showEditCuotaModal, setShowEditCuotaModal] = useState(false);
    const [showDeleteCuotaModal, setShowDeleteCuotaModal] = useState(false);

    useEffect(() => {
        getCuotas();
    }, [])

    const openEditModal = () => {
        setShowEditCuotaModal(true);
    };

    const openDeleteModal = () => {
        setShowDeleteCuotaModal(true);
    };

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Listado de Cuotas</h3>
                </div>
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Numero</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cuotas ?
                            cuotas.map((cuota, index) =>
                                <CuotaItem
                                    cuota={cuota}
                                    key={index}
                                    index={index}
                                    openEditModal={openEditModal}
                                    openDeleteModal={openDeleteModal}
                                />
                            )
                            :
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No hay cuotas cargadas
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>

            <EditCuotaModal
                show={showEditCuotaModal}
                onHide={() => setShowEditCuotaModal(false)}
            />

            <DeleteCuotaModal
                show={showDeleteCuotaModal}
                onHide={() => setShowDeleteCuotaModal(false)}
            />

        </>
    );
};

export default CuotaList;