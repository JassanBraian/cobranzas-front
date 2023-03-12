import { useState, useContext } from 'react';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
import clientAxios from '../../config/axios/axios';
import AlumCarreraContext from './AlumCarreraContext';
import AlumnoContext from '../alumno/AlumnoContext';

const AlumCarreraProvider = ({ children }) => {

    const { getAlumno } = useContext(AlumnoContext);

    const initialValues = {
        alumnosCarreras: [],
        currentAlumCarrera: {},
        carrerasDispAlum: []
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
            //Peticion a .net:
            // const resCarreras = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`, alumId);
            const resCarreras = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
            const carreras = resCarreras.data.filter(carr => carr.Eliminado === false);

            const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);
            const preciosCuo = resPreciosCuo.data.filter(preCuo => preCuo.Eliminado === false);

            const resAlumCarr = await clientAxios.get(`${API_URL_JSON_SERVER}/alumcarrera`);

            // Este servicio NO verifica la propiedad Eliminado... Tema dejado para aprlicar diric en net
            if (resAlumCarr.status === 200 && resAlumCarr.data
                && resCarreras.status === 200 && carreras
                && resPreciosCuo.status === 200 && preciosCuo) {

                const carrerasAlumno = resAlumCarr.data.filter(alumCarr => alumCarr.fkAlumno === alumId);

                if (carrerasAlumno.length > 0) {
                    carrerasAlumno.map(carrAlum => {
                        const carrera = carreras.filter(carrera => carrera.id === carrAlum.fkCarrera)[0];
                        const preciosCuoCarr = preciosCuo
                            .filter(preCuo => preCuo.fkCarrera === carrera.id);
                        const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];

                        carrAlum.carrera = resCarreras.data.filter(carr => carr.id === carrAlum.fkCarrera)[0];
                        carrAlum.carrera.precioCuo = precioCuoAct.monto;
                    });

                    setValues({
                        ...values,
                        alumnosCarreras: carrerasAlumno
                    });
                }
            }
        } catch (error) {
            throw error;
        }
    }

    const getAlumCarrDispByAlumId = async alumId => {
        try {
            const resCarreras = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
            const carreras = resCarreras.data.filter(carr => carr.Eliminado === false);

            const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);
            const preciosCuo = resPreciosCuo.data.filter(preCuo => preCuo.Eliminado === false);

            const resAlumCarr = await clientAxios.get(`${API_URL_JSON_SERVER}/alumcarrera`);

            // Este servicio NO verifica la propiedad Eliminado... Tema dejado para aprlicar diric en net
            if (resAlumCarr.status === 200 && resAlumCarr.data
                && resCarreras.status === 200 && carreras
                && resPreciosCuo.status === 200 && preciosCuo) {

                const carrerasAlumno = resAlumCarr.data.filter(alumCarr => alumCarr.fkAlumno === alumId);

                let carrDispAlum = [];
                carreras.forEach(carrera => {
                    let exist = false;
                    carrerasAlumno.forEach(carrAlum => {
                        if (carrera.id === carrAlum.fkCarrera) {
                            exist = true;
                        }
                    });
                    !exist && carrDispAlum.push(carrera);
                });

                if (carrDispAlum.length > 0) {
                    carrDispAlum.map(carrDisp => {
                        const preciosCuoCarr = preciosCuo
                            .filter(preCuo => preCuo.fkCarrera === carrDisp.id);
                        const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];

                        carrDisp.precioCuo = precioCuoAct.monto;
                    });

                    setValues({
                        ...values,
                        carrerasDispAlum: carrDispAlum
                    });
                } else {
                    setValues({
                        ...values,
                        carrerasDispAlum: []
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
            alumCarrera.Eliminado = false;
            const res = await clientAxios.post(`${API_URL_JSON_SERVER}/alumcarrera`, alumCarrera);
            res.status === 201 && await getAlumno(alumCarrera.fkAlumno);
        } catch (error) {
            throw error;
        }
    };

    // Fuera de uso... No probado
    const deleteAlumCarrera = async alumCarreraId => {
        try {
            const res = await clientAxios.delete(`${API_URL_JSON_SERVER}/alumcarrera/${alumCarreraId}`);
            res.status === 200 && await getAlumnosCarreras();
        } catch (error) {
            throw error;
        }
    };

    const clearAlumCarreras = () => setValues({ ...values, alumnosCarreras: [] });

    //const clearAlumCarreras = () => setValues({ ...values, alumnosCarreras: [] });


    return (
        <AlumCarreraContext.Provider value={{
            ...values,
            getAlumnosCarreras,
            getAlumCarrerasByAlumId,
            getAlumCarrDispByAlumId,
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