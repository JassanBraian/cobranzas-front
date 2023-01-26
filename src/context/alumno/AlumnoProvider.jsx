import { useState, useContext, Children } from 'react';
import AlumnoContext from './AlumnoContext';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
import clientAxios from '../../config/axios/axios';

const AlumnoProvider = ({ children }) => {

    const initialValues = {
        alumnos: [],
        currentAlumno: {}
    };

    const [values, setValues] = useState(initialValues);

    const getAlumnos = async () => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/alumno`);
            res.status === 200 && setValues({ ...values, alumnos: res.data });
        } catch (error) {
            throw error;
        }
    }

    const getAlumno = async alumnoId => {
        try {
            const res = await clientAxios.get(`${API_URL_JSON_SERVER}/alumno/${alumnoId}`);
            res.status === 200 && setValues({ ...values, currentAlumno: res.data });
        } catch (error) {
            throw error;
        }
    }

    const addAlumno = async alumno => {
        try {
            alumno.fechaIngreso = new Date(Date.now()).toLocaleDateString();
            alumno.porcBeca = parseFloat(alumno.porcBeca);
            const res = await clientAxios.post(`${API_URL_JSON_SERVER}/alumno`, alumno);
            res.status === 201 && await getAlumnos();
        } catch (error) {
            throw error;
        }
    }

    const updateAlumno = async alumno => {
        try {
            //verif que no se pierda la fecha de ingreso una vez conectado a .net
            alumno.porcBeca = parseFloat(alumno.porcBeca);
            const res = await clientAxios.put(`${API_URL_JSON_SERVER}/alumno/${alumno.id}`, alumno);
            res.status === 200 && await getAlumnos();
        } catch (error) {
            throw error;
        }
    }

    const deleteAlumno = async alumnoId => {
        try {
            const res = await clientAxios.delete(`${API_URL_JSON_SERVER}/alumno/${alumnoId}`);
            res.status === 200 && await getAlumnos();
        } catch (error) {
            throw error;
        }
    }

    return (
        <AlumnoContext.Provider value={{
            ...values,
            getAlumnos,
            getAlumno,
            addAlumno,
            updateAlumno,
            deleteAlumno
        }}>
            {children}
        </AlumnoContext.Provider>
    );
};

export default AlumnoProvider;