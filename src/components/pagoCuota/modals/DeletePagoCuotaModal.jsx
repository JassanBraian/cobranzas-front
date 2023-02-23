import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PagoCuotaContext from '../../../context/pagoCuota/PagoCuotaContext';

const DeletePagoCuotaModal = ({ show, onHide }) => {
    const { deletePagoCuota, currentPagoCuo } = useContext(PagoCuotaContext);

    const confirmDelete = () => {
        deletePagoCuota(currentPagoCuo);
        onHide();
    }
    return (
        <>
            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modaltitle'>
                    <Modal.Title>
                        ¿Está seguro de eliminar este registro?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>El registro será borrado de forma permanente.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeletePagoCuotaModal;