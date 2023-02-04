import { useState } from 'react';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
import clientAxios from '../../config/axios/axios';
import AlumCarreraContext from './AlumCarreraContext';

const AlumCarreraProvider = ({ children }) => {

    const initialValues = {
        alumnosCarreras: [],
        currentAlumCarrera: {}
    };

    const [values, setValues] = useState(initialValues);

    const getAlumnosCarreras = async () => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/alumcarrera`);
            res.status === 200 && setValues({ ...values, alumnosCarreras: res.data });
        } catch (error) {
            throw error;
        }
    }

    const getAlumCarrerasByAlumId = async alumId => {
        try {
            const resAlumCarr = await clientAxios.get(`${API_URL_JSON_SERVER}/alumcarrera`);

            const resCarreras = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
            const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);

            if (resAlumCarr.status === 200 && resAlumCarr.data
                && resCarreras.status === 200 && resCarreras.data
                && resPreciosCuo.status === 200 && resPreciosCuo.data) {
                const carrerasAlum = resAlumCarr.data.filter(alumCarr => alumCarr.fkAlumno === alumId);

                if (carrerasAlum.length > 0) {

                    carrerasAlum.map(carrAlum => {
                        const carrera = resCarreras.data.filter(carrera => carrera.id === carrAlum.fkCarrera)[0];
                        const preciosCuoCarr = resPreciosCuo.data
                            .filter(preCuo => preCuo.fkCarrera === carrera.id);
                        const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];

                        carrAlum.carrera = resCarreras.data.filter(carr => carr.id === carrAlum.fkCarrera)[0];
                        carrAlum.carrera.precioCuo = precioCuoAct.monto;
                    });

                    setValues({
                        ...values,
                        alumnosCarreras: carrerasAlum
                    });
                }
            }
        } catch (error) {
            throw error;
        }
    }

    const getAlumCarrera = async alumCarreraId => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/alumcarrera/${alumCarreraId}`);
            res.status === 200 && setValues({ ...values, currentAlumCarrera: res.data });
        } catch (error) {
            throw error;
        }
    }

    const addAlumCarrera = async alumCarrera => {
        try {
            const res = await clientAxios.post(`${API_URL_JSON_SERVER}/alumcarrera`, alumCarrera);
            res.status === 201 && await getAlumnosCarreras();
        } catch (error) {
            throw error;
        }
    };

    const deleteAlumCarrera = async alumCarreraId => {
        try {
            const res = await clientAxios.delete(`${API_URL_JSON_SERVER}/alumcarrera/${alumCarreraId}`);
            res.status === 200 && await getAlumnosCarreras();
        } catch (error) {
            throw error;
        }
    };

    const clearAlumCarreras = () => setValues({ ...values, alumnosCarreras: [] });

    return (
        <AlumCarreraContext.Provider value={{
            ...values,
            getAlumnosCarreras,
            getAlumCarrerasByAlumId,
            getAlumCarrera,
            addAlumCarrera,
            deleteAlumCarrera,
            clearAlumCarreras
        }}>
            {children}
        </AlumCarreraContext.Provider>
    );
};

export default AlumCarreraProvider;