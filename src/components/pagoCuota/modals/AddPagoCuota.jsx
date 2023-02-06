import { useState, useContext } from "react";
import { Form, Button } from 'react-bootstrap';
import PagoCuotaContext from "../../../context/pagoCuota/PagoCuotaContext";
import CuotaContext from '../../../context/cuota/CuotaContext';
import CarreraContext from "../../../context/carrera/CarrerasContext";

const AddPagoCuota = () => {

    const { addPagoCuota } = useContext(PagoCuotaContext);
    const { currentCuota } = useContext(CuotaContext);
    const { currentCarrera } = useContext(CarreraContext);

    const initialFormValues = {
        monto: 0,
        //porcPago: 0,
        //fecha: ''
    };

    const [form, setForm] = useState(initialFormValues);
    //const { monto, porcPago, fecha } = form;
    const { monto } = form;

    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const abonarPagoCuota = () => {
        // if (!monto || !porcPago || !fecha) {
        if (!monto) {
            setErrorMsg('Todos los campos son obligatorios');
            return;
        }
        setErrorMsg(null);
        addPagoCuota({
            fkCuota: currentCuota.id,
            monto: monto,
            porcPago: (monto * 100 / currentCarrera.precioCuo).toFixed(1)
        });
    };

    return (
        <>
            <Form className='mb-3'>
                <div className="row d-flex justify-content-between">
                    <div className="col-3 d-flex align-items-center">
                        Realizar nuevo Pago:
                    </div>
                    <div className="col-7">
                        <Form.Control
                            type="number"
                            placeholder="Monto abonado"
                            name="monto"
                            value={monto}
                            onChange={handleChange}
                            onFocus={() => setErrorMsg(null)}
                        />
                    </div>
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        <Button
                            variant="success"
                            onClick={() => {
                                abonarPagoCuota();
                            }}
                        >
                            Abonar
                        </Button>
                    </div>
                    <div>
                        {errorMsg && (<p className="error-msg">{errorMsg}</p>)}
                    </div>
                </div>
            </Form>
        </>
    );
};

export default AddPagoCuota;