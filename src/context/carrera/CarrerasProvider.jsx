import { useState } from 'react';
import CarrerasContext from './CarrerasContext';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
import clientAxios from '../../config/axios/axios';

const CarrerasProvider = ({ children }) => {

  const initialValue = {
    carreras: [],
    currentCarrera: {}
  };

  const [values, setValues] = useState(initialValue);

  const getCarreras = async () => {
    try {
      // Con .net traer las carreras con su respectivo precio de cuota actualizado (ultima fecha alta). 
      // Con react descomentar estas dos lineas y comentar de la 22 hasta la 35
      //const res = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
      //res.status === 200 && setValues({ ...values, carreras: res.data });
      
      const resCarreras = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
      const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);

      if (resCarreras.status === 200 && resCarreras.data
        && resPreciosCuo.status === 200 && resPreciosCuo.data) {
        resCarreras.data.map(carrera => {
          const preciosCuoCarr = resPreciosCuo.data
            .filter(preCuo => preCuo.fkCarrera === carrera.id);
          const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];
          carrera.precioCuo = precioCuoAct.monto;
        });

        setValues({ ...values, carreras: resCarreras.data });
      }
    } catch (error) {
      throw error;
    }
  }

  const getCarrera = async carreraId => {
    try {
      const res = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera/${carreraId}`);
      res.status === 200 && setValues({ ...values, currentCarrera: res.data });
    } catch (error) {
      throw error;
    }
  }

  const addCarrera = async carrera => {
    try {
      const res = await clientAxios.post(`${API_URL_JSON_SERVER}/carrera`, carrera);
      res.status === 201 && await getCarreras();
    } catch (error) {
      throw error;
    }
  };

  const updateCarrera = async carrera => {
    try {
      const res = await clientAxios.put(`${API_URL_JSON_SERVER}/carrera/${carrera.id}`, carrera);
      res.status === 200 && await getCarreras();
    } catch (error) {
      throw error;
    }
  };

  const deleteCarrera = async carreraId => {
    try {
      const res = await clientAxios.delete(`${API_URL_JSON_SERVER}/carrera/${carreraId}`);
      res.status === 200 && await getCarreras();
    } catch (error) {
      throw error;
    }
  };

  return (
    <CarrerasContext.Provider value={{
      ...values,
      getCarreras,
      getCarrera,
      addCarrera,
      deleteCarrera,
      updateCarrera
    }}>
      {children}
    </CarrerasContext.Provider>
  );
};

export default CarrerasProvider;