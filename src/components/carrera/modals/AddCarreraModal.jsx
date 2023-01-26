import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CarrerasContext from '../../../context/carrera/CarrerasContext';
import '../../../css/entities/carrera/carrera.css';

const AddCarreraModal = ({ show, onHide }) => {
    const { addCarrera } = useContext(CarrerasContext);

    const initialFormValues = {
        descripcion: '',
        precioCuo: 0
    };

    const [form, setForm] = useState(initialFormValues);
    const { descripcion, precioCuo } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (descripcion === '' || !precioCuo) {
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
                <Modal.Header className='modaltitle'>
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
                                name="descripcion"
                                value={descripcion}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio Cuota</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Precio de la Cuota"
                                name="precioCuo"
                                value={precioCuo}
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
                            Añadir
                        </Button>
                        <Button variant="danger" onClick={onHide}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default AddCarreraModal;