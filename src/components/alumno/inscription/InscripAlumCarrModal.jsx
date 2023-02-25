import AlumCarrList from './AlumCarrList';
import CarrDispList from './CarrDispList';
import { Modal, Button } from 'react-bootstrap';

const InscripAlumCarrModal = ({ show, onHide }) => {

    return (
        <>
            <Modal
                show={show}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modaltitle'>
                    <Modal.Title>
                        Inscripción de Alumno a una Carrera
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Carreras disponibles</h5>
                    <CarrDispList />

                    <h5>Carreras cursadas por el Alumno</h5>
                    <AlumCarrList />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InscripAlumCarrModal;