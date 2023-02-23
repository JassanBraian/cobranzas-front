import { useEffect, useContext, useState } from 'react';
import PagoCuotaContext from '../../../context/pagoCuota/PagoCuotaContext';
import CuotaContext from '../../../context/cuota/CuotaContext';
import { Table } from "react-bootstrap";
import PagoCuotaItem from './PagoCuotaItem';
import EditPagoCuotaModal from '../modals/EditPagoCuotaModal';
import DeletePagoCuotaModal from '../modals/DeletePagoCuotaModal';

const PagoCuotaList = () => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { getPagosCuotaByCuotaId, pagosCuota } = useContext(PagoCuotaContext);
    const { currentCuota } = useContext(CuotaContext);

    useEffect(() => {
        getPagosCuotaByCuotaId(currentCuota.id);
    }, [currentCuota.id]);

    const openEditModal = () => {
        setShowEditModal(true);
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Monto</th>
                        <th>Porc. Pago</th>
                        <th>Fecha</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pagosCuota && pagosCuota.length > 0 ?
                            pagosCuota.map((pagoCuota, index) =>
                                <PagoCuotaItem
                                    pagoCuota={pagoCuota}
                                    key={index}
                                    index={index}
                                    openEditModal={openEditModal}
                                    openDeleteModal={openDeleteModal}
                                />
                            )
                            :
                            <tr>
                                <td colSpan={5} className="text-center">
                                    La Cuota seleccionada no posee Pagos realizados
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>

            <EditPagoCuotaModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
            />

            <DeletePagoCuotaModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
            />
        </>
    );
};

export default PagoCuotaList;