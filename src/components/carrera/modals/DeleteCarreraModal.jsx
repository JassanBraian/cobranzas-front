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
                <Modal.Header>
                    <Modal.Title>
                        ¿Estás seguro que deseas eliminar esta carrera?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Se borrará permanentemente</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteCarrera}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteCarreraModal;