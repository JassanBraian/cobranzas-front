import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CarreraContext from '../../../context/carrera/CarrerasContext';

const DeleteCarreraModal = ({ show, onHide }) => {
    const { deleteCarrera, currentCarrera } = useContext(CarreraContext);

    const confirmDeleteCarrera = () => {
        deleteCarrera(currentCarrera.id);
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
                    <Button variant="danger" onClick={confirmDeleteCarrera}>
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

export default DeleteCarreraModal;