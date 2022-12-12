import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CarrerasContext from '../../../context/carrera/CarrerasContext';

const AddCarreraModal = ({ show, onHide }) => {
    const { addCarrera } = useContext(CarrerasContext);

    const initialFormValues = {
        nombre: ''
    };

    const [form, setForm] = useState(initialFormValues);
    const { nombre } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (nombre === '') {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }
        setErrorMsg(null);
        addCarrera(form);
        onHide();
    };

    return (
        <>
            <Modal
                show={show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        Agregar carrera
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre de la carrera"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <div>
                            {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Agregar carrera
                        </Button>
                        <Button variant="danger" onClick={onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default AddCarreraModal;