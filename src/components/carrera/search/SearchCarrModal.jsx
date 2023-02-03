import { Modal, Button } from "react-bootstrap";
import CarrListBase from "./CarrListBase";

const SearchCarrModal = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='modaltitle'>
                <Modal.Title>
                    Seleccionar Carrera
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CarrListBase closeSearchModal={onHide} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchCarrModal;