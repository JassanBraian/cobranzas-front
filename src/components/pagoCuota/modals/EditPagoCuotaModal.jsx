import { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PagoCuotaContext from '../../../context/pagoCuota/PagoCuotaContext';
import CarreraContext from '../../../context/carrera/CarrerasContext';

const EditPagoCuotaModal = ({ show, onHide }) => {

    const { currentCarrera } = useContext(CarreraContext);
    const { currentPagoCuo, updatePagoCuota } = useContext(PagoCuotaContext);

    const initialFormValues = {
        monto: 0
    };

    const [form, setForm] = useState(initialFormValues);
    const { monto } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        setForm(currentPagoCuo);
    }, [currentPagoCuo]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!monto) {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }
        setErrorMsg(null);
        updatePagoCuota(form, currentCarrera.precioCuo);
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
                        Editar Pago de Cuota
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Monto abonado"
                                name="monto"
                                value={monto}
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

export default EditPagoCuotaModal;