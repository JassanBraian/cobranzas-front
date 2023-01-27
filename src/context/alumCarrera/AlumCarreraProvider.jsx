import { ValueListObserver } from '@hotwired/stimulus';
import React from 'react';

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
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/alumcarrera`);
            res.status === 200
                && setValues({ ...values, alumnosCarreras: res.data.filter(alumCarr => alumCarr.fkAlumno === alumId) });
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

    return (
        <AlumCarreraContext.Provider value={{
            ...values,
            getAlumnosCarreras,
            getAlumCarrerasByAlumId,
            getAlumCarrera,
            addAlumCarrera,
            deleteAlumCarrera
        }}>
            {children}
        </AlumCarreraContext.Provider>
    );
};

export default AlumCarreraProvider;