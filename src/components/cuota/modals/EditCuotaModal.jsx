import { useContext, useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import CuotaContext from '../../../context/cuota/CuotaContext';

const EditCuotaModal = ({ show, onHide }) => {

    const { updateCuota, currentCuota } = useContext(CuotaContext);

    const initialFormValues = {
        numero: 0,
        estadoCuo: ''
    };

    const [form, setForm] = useState(initialFormValues);
    const { numero, estadoCuo } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setForm(currentCuota);
    }, [currentCuota]);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (numero === '' || !estadoCuo) {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }
        setErrorMsg(null);
        updateCuota(form);
        onHide();
    };

    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="modaltitle">
                <Modal.Title>
                    Editar cuota
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Numero</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Numero de cuota"
                            name="numero"
                            value={numero}
                            onChange={handleChange}
                            onFocus={() => setErrorMsg(null)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado de Cuota</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Estado de cuota"
                            name="estadoCuo"
                            value={estadoCuo}
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
    );
};

export default EditCuotaModal;