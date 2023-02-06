import { useContext } from 'react';
import PagoCuotaContext from '../../../context/pagoCuota/PagoCuotaContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";

const PagoCuotaItem = ({ pagoCuota, index, openPagoCuotaModal, openEditModal, openDeleteModal }) => {

    const { getPagoCuota } = useContext(PagoCuotaContext);

    return (
        <>
            <tr>
                <td> {index + 1} </td>
                <td> {pagoCuota.monto} </td>
                <td> {pagoCuota.porcPago}% </td>
                <td> {pagoCuota.fecha} </td>
                <td className="text-center">
                    <Button
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                            getPagoCuota(pagoCuota.id);
                            openEditModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            getPagoCuota(pagoCuota.id);
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

export default PagoCuotaItem;