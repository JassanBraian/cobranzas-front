import React from 'react';
import PrecioCuoContext from './PrecioCuoContext';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
import clientAxios from '../../config/axios/axios';

const PrecioCuoProvider = ({ children }) => {

    const initialValue = {
        preciosCuo: [],
        currentPrecioCuo: {}
    }

    const [values, setValues] = useState(initialValue);

    const getPreciosCuo = async () => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);
            res.status === 200 && setValues({ ...values, preciosCuo: res.data });
        } catch (error) {
            throw error;
        }
    }

    const getPrecioCuo = async precioCuoId => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota/${precioCuoId}`);
            res.status === 200 && setValues({ ...values, currentPrecioCuo: res.data });
        } catch (error) {
            throw error;
        }
    }

    const addPrecioCuo = async precioCuo => {
        try {
            const res = await clientAxios.post(`${API_URL_JSON_SERVER}/preciocuota`, precioCuo);
            res.status === 201 && await getPreciosCuo();
        } catch (error) {
            throw error;
        }
    };

    const updatePrecioCuo = async precioCuo => {
        try {
            const res = await clientAxios.put(`${API_URL_JSON_SERVER}/preciocuota/${precioCuo.id}`, precioCuo);
            res.status === 200 && await getPreciosCuo();
        } catch (error) {
            throw error;
        }
    };

    const deletePrecioCuo = async precioCuoId => {
        try {
            const res = await clientAxios.delete(`${API_URL_JSON_SERVER}/preciocuota/${precioCuoId}`);
            res.status === 200 && await getPreciosCuo();
        } catch (error) {
            throw error;
        }
    };

    return (
        <PrecioCuoContext.Provider value={{
            ...values,
            getPreciosCuo,
            getPrecioCuo,
            addPrecioCuo,
            deletePrecioCuo,
            updatePrecioCuo
        }}>
            {children}
        </PrecioCuoContext.Provider>
    );
};

export default PrecioCuoProvider;