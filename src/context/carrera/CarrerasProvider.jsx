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
      const res = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
      res.status === 200 && setValues({ ...values, carreras: res.data });
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