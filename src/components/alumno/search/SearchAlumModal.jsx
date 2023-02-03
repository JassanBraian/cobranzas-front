import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AlumListBase from './AlumListBase';

const SearchAlumModal = ({ show, onHide }) => {

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
                        Seleccionar Alumno
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlumListBase closeSearchModal={onHide} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchAlumModal;