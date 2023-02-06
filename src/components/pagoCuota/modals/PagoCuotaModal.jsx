import { Modal, Button } from "react-bootstrap";
import PagoCuotaList from "../base/PagoCuotaList";
import AddPagoCuota from "./AddPagoCuota";

const PagoCuotaModal = ({ show, onHide }) => {

    return (
        < Modal
            show={show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='modaltitle'>
                <Modal.Title>
                    Pagos realizados a la Cuota seleccionada
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <AddPagoCuota />
                <PagoCuotaList />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default PagoCuotaModal;