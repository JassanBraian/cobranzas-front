import { useState } from 'react';
import PagoCuotaContext from './PagoCuotaContext';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
import clientAxios from '../../config/axios/axios';

const PagoCuotaProvider = ({ children }) => {

    const initialValue = {
        pagosCuota: [],
        currentPagoCuo: {}
    }

    const [values, setValues] = useState(initialValue);

    const getPagosCuota = async () => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/pagocuota`);
            res.status === 200 && setValues({
                ...values,
                pagosCuota: res.data.filter(pagoCuo => pagoCuo.Eliminado === false)
            });
        } catch (error) {
            throw error;
        }
    }

    const getPagosCuotaByCuotaId = async cuotaId => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/pagocuota`);

            if (res.status === 200 && res.data) {
                setValues({
                    ...values,
                    pagosCuota: res.data
                        .filter(pagoCuo => pagoCuo.fkCuota === cuotaId && pagoCuo.Eliminado === false)
                });
            }
        } catch (error) {
            throw error;
        }
    }

    const getPagoCuota = async pagoCuoId => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/pagocuota/${pagoCuoId}`);
            res.status === 200 && setValues({ ...values, currentPagoCuo: res.data });
        } catch (error) {
            throw error;
        }
    }

    const addPagoCuota = async pagoCuo => {
        try {
            // Obtener precio actual cuota y con monto abonado calcular porcentaje del pago realizado
            pagoCuo.fecha = new Date(Date.now()).toLocaleDateString();
            pagoCuo.Eliminado = false;
            const res = await clientAxios.post(`${API_URL_JSON_SERVER}/pagocuota`, pagoCuo);
            res.status === 201 && await getPagosCuota();
            // pendiente en caso que llegue a completar el pago de la cuota, se debe actualizar la ...
            // la el estaod de la cuota a pagado !!
        } catch (error) {
            throw error;
        }
    }

    const updatePagoCuota = async pagoCuo => {
        try {
            const res = await clientAxios.put(`${API_URL_JSON_SERVER}/pagocuota/${pagoCuo.id}`, pagoCuo);
            res.status === 200 && await getPagosCuota();
        } catch (error) {
            throw error;
        }
    }

    const deletePagoCuota = async pagoCuo => {
        try {
            pagoCuo.Eliminado = true;
            const res = await clientAxios.put(`${API_URL_JSON_SERVER}/pagocuota/${pagoCuo.id}`, pagoCuo);
            res.status === 200 && await getPagosCuota();
        } catch (error) {
            throw error;
        }
    }


    return (
        <PagoCuotaContext.Provider value={{
            ...values,
            getPagosCuota,
            getPagosCuotaByCuotaId,
            getPagoCuota,
            addPagoCuota,
            updatePagoCuota,
            deletePagoCuota
        }}>
            {children}
        </PagoCuotaContext.Provider>
    );
};

export default PagoCuotaProvider;