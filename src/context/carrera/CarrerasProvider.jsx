import { useState, useContext } from 'react';
import CarrerasContext from './CarrerasContext';
import clientAxios from '../../config/axios/axios';
import PrecioCuoContext from '../../context/precioCuota/PrecioCuoContext';

const CarrerasProvider = ({ children }) => {

  const { addPrecioCuo } = useContext(PrecioCuoContext);

  const initialValue = {
    carreras: [],
    currentCarrera: {}
  };

  const [values, setValues] = useState(initialValue);

  const getCarreras = async () => {
    try {      
      const carreras = await clientAxios.get(`/carrera/ObtenerTodos`);
      carreras.status === 200 && carreras.data.value && setValues({ ...values, carreras: carreras.data.value });
    } catch (error) {
      throw error;
    }
  }

  const getCarrera = async carreraId => {
    try {
      const carrera = await clientAxios.get(`/carrera/${carreraId}`);
      carrera.status === 200 && carrera.data && setValues({ ...values, currentCarrera: carrera.data });
    } catch (error) {
      throw error;
    }
  }

  const addCarrera = async carrera => {
    try {
      const precioCuo = parseFloat(carrera.precioCuo);
      delete carrera.precioCuo;

      carrera.cantCuotas = parseFloat(carrera.cantCuotas);

      const resNewCarrera = await clientAxios.post(`/carrera`, carrera);
      console.log(resNewCarrera)
      if (resNewCarrera.status === 201) {
        addPrecioCuo({
          fkCarrera: resNewCarrera.data.id,
          monto: precioCuo,
          fecha: new Date(Date.now()).toLocaleDateString(),
          Eliminado: false
        });
        await getCarreras();
      }
    } catch (error) {
      throw error;
    }
  };

  const updateCarrera = async carrera => {
    try {
      // Se elimina esta prop debido a que solo existe en front, no la queremos al impactar
      const precioCuo = parseFloat(carrera.precioCuo);
      delete carrera.precioCuo;

      carrera.cantCuotas = parseFloat(carrera.cantCuotas);

      const resUpdateCarrera = await clientAxios.put(`/carrera/${carrera.id}`, carrera);
      if (resUpdateCarrera.status === 200) {
        addPrecioCuo({
          fkCarrera: resUpdateCarrera.data.id,
          monto: precioCuo,
          fecha: new Date(Date.now()).toLocaleDateString(),
          Eliminado: false
        });
        await getCarreras();
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteCarrera = async carrera => {
    try {
      //const res = await clientAxios.delete(`${API_URL_JSON_SERVER}/carrera/${carreraId}`);
      carrera.Eliminado = true;
      const res = await clientAxios.put(`/carrera/${carrera.id}`, carrera);
      res.status === 200 && await getCarreras();
    } catch (error) {
      throw error;
    }
  };

  const clearCurrentCarrera = () => setValues({ ...values, currentCarrera: {} });

  return (
    <CarrerasContext.Provider value={{
      ...values,
      getCarreras,
      getCarrera,
      addCarrera,
      deleteCarrera,
      updateCarrera,
      clearCurrentCarrera
    }}>
      {children}
    </CarrerasContext.Provider>
  );
};

export default CarrerasProvider;