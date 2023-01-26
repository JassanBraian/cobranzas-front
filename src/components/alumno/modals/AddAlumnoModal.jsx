import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AlumnoContext from '../../../context/alumno/AlumnoContext';
import '../../../css/entities/carrera/carrera.css';

const AddAlumnoModal = ({ show, onHide }) => {

    const { addAlumno } = useContext(AlumnoContext);

    const initialFormValues = {
        apellido: '',
        nombre: '',
        dni: '',
        legajo: '',
        mail: '',
        porcBeca: 0
    };

    const [form, setForm] = useState(initialFormValues);
    const { apellido, nombre, dni, legajo, mail, porcBeca } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!apellido || !nombre || !dni || !legajo || !mail || !porcBeca) {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }
        setErrorMsg(null);
        addAlumno(form);
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
                        Agregar alumno
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del alumno"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Apellido del alumno"
                                name="apellido"
                                value={apellido}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dni</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dni del alumno"
                                name="dni"
                                value={dni}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Legajo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Legajo del alumno"
                                name="legajo"
                                value={legajo}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Mail del alumno"
                                name="mail"
                                value={mail}
                                onChange={handleChange}
                                onFocus={() => setErrorMsg(null)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Porc. de Beca</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Porc. de Beca"
                                name="porcBeca"
                                value={porcBeca}
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

export default AddAlumnoModal;