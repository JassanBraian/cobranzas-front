import { useState } from 'react';
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

    const getPreciosCuoByCarrId = async carrId => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);
            res.status === 200
                && setValues({ ...values, preciosCuo: res.data.filter(preCuo => preCuo.fkCarrera === carrId) });
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

    const getPrecioCuoActCarr = async carrId => {
        try {
            // Sin uso por el momento... verif funcionamiento
            const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);
            if (resPreciosCuo.status === 200 && resPreciosCuo.data) {
                const preciosCuoCarr = resPreciosCuo.data
                    .filter(preCuo => preCuo.fkCarrera === carrId);
                const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];
                setValues({
                    ...values,
                    currentPrecioCuo: precioCuoAct
                });
            }
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
            getPreciosCuoByCarrId,
            getPrecioCuo,
            getPrecioCuoActCarr,
            addPrecioCuo,
            deletePrecioCuo,
            updatePrecioCuo
        }}>
            {children}
        </PrecioCuoContext.Provider>
    );
};

export default PrecioCuoProvider;