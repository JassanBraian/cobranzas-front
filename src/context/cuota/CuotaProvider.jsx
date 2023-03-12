import { useState } from 'react';
import CuotaContext from './CuotaContext';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
import clientAxios from '../../config/axios/axios';

const CuotaProvider = ({ children }) => {

    const initialValue = {
        cuotas: [],
        currentCuota: {}
    }

    const [values, setValues] = useState(initialValue);

    const getCuotas = async () => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/cuota`);
            res.status === 200 && setValues({
                ...values,
                cuotas: res.data.filter(cuo => cuo.Eliminado === false)
            });
        } catch (error) {
            throw error;
        }
    }

    const getCuotasByAlumAndCarr = async (fkAlum, fkCarr) => {
        try {
            const alumAndCarr = { fkAlum, fkCarr };
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/cuota`, alumAndCarr);
            //Eliminar logica de front y en .net añadir metodo que espere obj de params
            res.status === 200 && setValues({
                ...values,
                cuotas: res.data.filter(cuo => cuo.fkAlumno === fkAlum && cuo.fkCarrera === fkCarr)
            });
        } catch (error) {
            throw error;
        }
    }

    const getCuota = async cuotaId => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/cuota/${cuotaId}`);
            res.status === 200 && setValues({ ...values, currentCuota: res.data });
        } catch (error) {
            throw error;
        }
    }

    const getNewNumCuota = async () => {
        try {

        } catch (error) {
            throw error;
        }
    }

    const addCuota = async (alumId, carrId) => {
        try {
            const cuota = {};
            // Obtener ultimo numero de cuota con estado pagado para cargar +1 en la sgte linea
            // En caso de existir cuota sin terminar de abonar, no se puede abonar la sgte
            cuota.numero = 0;
            cuota.estadoCuo = "impago";
            cuota.fkAlumno = alumId;
            cuota.fkCarrera = carrId;
            cuota.fecha = new Date(Date.now()).toLocaleDateString();
            cuota.Eliminado = false;

            const res = await clientAxios.post(`${API_URL_JSON_SERVER}/cuota`, cuota);
            res.status === 201 && await getCuotas();
        } catch (error) {
            throw error;
        }
    }

    const updateCuota = async cuota => {
        try {
            const res = await clientAxios.put(`${API_URL_JSON_SERVER}/cuota/${cuota.id}`, cuota);
            res.status === 200 && await getCuotas();
        } catch (error) {
            throw error;
        }
    }

    const deleteCuota = async cuota => {
        try {
            cuota.Eliminado = true;
            const res = await clientAxios.put(`${API_URL_JSON_SERVER}/cuota/${cuota.id}`, cuota);
            res.status === 200 && await getCuotas();
        } catch (error) {
            throw error;
        }
    }

    const clearCuotas = () => setValues({ ...values, cuotas: [] });

    return (
        <CuotaContext.Provider value={{
            ...values,
            getCuotas,
            getCuotasByAlumAndCarr,
            getCuota,
            addCuota,
            updateCuota,
            deleteCuota,
            clearCuotas
        }}>
            {children}
        </CuotaContext.Provider>
    );
};

export default CuotaProvider;