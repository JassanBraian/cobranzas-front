import { useContext, useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import CarrerasContext from '../../../context/carrera/CarrerasContext';

const EditCarreraModal = ({ show, onHide }) => {
    const { currentCarrera, updateCarrera } = useContext(CarrerasContext);

    const initialFormValues = {
        nombre: '',
        precioCuo: 0
    };

    const [form, setForm] = useState(initialFormValues);
    const { nombre, precioCuo } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setForm(currentCarrera);
    }, [currentCarrera]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (nombre === '' || !precioCuo) {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }
        setErrorMsg(null);
        updateCarrera(form);
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
                <Modal.Header className="modaltitle">
                    <Modal.Title>
                        Editar carrera
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
                            Guardar
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

export default EditCarreraModal;