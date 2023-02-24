import { useState, useContext } from 'react';
import CarrerasContext from './CarrerasContext';
import { API_URL_JSON_SERVER } from '../../config/jsonserver/connection';
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
      // Con .net traer las carreras con su respectivo precio de cuota actualizado (ultima fecha alta). 
      // Con react descomentar estas dos lineas y comentar de la 22 hasta la 35
      //const res = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
      //res.status === 200 && setValues({ ...values, carreras: res.data });

      const resCarreras = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera`);
      const carreras = resCarreras.data.filter(carr => carr.Eliminado === false);
      const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);
      const preciosCuo = resPreciosCuo.data.filter(preCuo => preCuo.Eliminado === false);

      if (resCarreras.status === 200 && carreras
        && resPreciosCuo.status === 200 && preciosCuo) {
        carreras.map(carrera => {
          const preciosCuoCarr = preciosCuo
            .filter(preCuo => preCuo.fkCarrera === carrera.id);
          const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];
          carrera.precioCuo = precioCuoAct.monto;
        });

        setValues({ ...values, carreras: carreras });
      }
    } catch (error) {
      throw error;
    }
  }

  const getCarrera = async carreraId => {
    try {
      // Con .net traer la carrera con su respectivo precio de cuota actualizado (ultima fecha alta). 
      // Con react descomentar estas dos lineas y comentar de la 48 hasta la 60
      // const res = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera/${carreraId}`);
      // res.status === 200 && setValues({ ...values, currentCarrera: res.data });

      const resCarrera = await clientAxios.get(`${API_URL_JSON_SERVER}/carrera/${carreraId}`);
      const resPreciosCuo = await clientAxios.get(`${API_URL_JSON_SERVER}/preciocuota`);

      if (resCarrera.status === 200 && resCarrera.data
        && resPreciosCuo.status === 200 && resPreciosCuo.data) {

        const preciosCuoCarr = resPreciosCuo.data
          .filter(preCuo => preCuo.fkCarrera === resCarrera.data.id);
        const precioCuoAct = preciosCuoCarr[preciosCuoCarr.length - 1];
        resCarrera.data.precioCuo = precioCuoAct.monto;
      }

      setValues({ ...values, currentCarrera: resCarrera.data });

    } catch (error) {
      throw error;
    }
  }

  const addCarrera = async carrera => {
    try {
      const precioCuo = parseFloat(carrera.precioCuo);
      delete carrera.precioCuo;

      carrera.cantCuotas = parseFloat(carrera.cantCuotas);

      const resNewCarrera = await clientAxios.post(`${API_URL_JSON_SERVER}/carrera`, carrera);
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

      const resUpdateCarrera = await clientAxios.put(`${API_URL_JSON_SERVER}/carrera/${carrera.id}`, carrera);
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
      const res = await clientAxios.put(`${API_URL_JSON_SERVER}/carrera/${carrera.id}`, carrera);
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