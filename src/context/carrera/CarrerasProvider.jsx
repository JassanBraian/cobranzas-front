import { useState } from 'react';
import CarrerasContext from './CarrerasContext';

const CarrerasProvider = ({ children }) => {

    const initialValue = {
        carreras: [],
        currentCarrera: {}
    };

    const [values, setValues] = useState(initialValue);

    const getCarreras = async () => {
        try {
            //trabajar con json server... por el momento. Luego axios para con .net si es que es posible
            setValues({...values, carreras: []})
        } catch (error) {
            throw error;
        }
    }
    
      const getCarrera = async carreraId => {
        try {
            // const res = await clientAxios.get(`http://localhost:4000/api/v1/product/${productId}`);
            // res && setValues({ ...values, currentProduct: res.data.product });
        } catch (error) {
            throw error;
        }
      }
    
      const addCarrera = async carrera =>{
        try {
        //   const res = await clientAxios.post('http://localhost:4000/api/v1/product/', product);
        //   res && setValues({ ...values, products: res.data.currentProduct });
        } catch (error) {
          throw error;
        }
      };
    
      const updateCarrera = async carrera => {
        try {
            // const res = await clientAxios.put(`http://localhost:4000/api/v1/product/${product._id}`, product);
            // res && await getProducts();
        } catch (error) {
            throw error;
        }
      };
    
      const deleteCarrera = async carreraId => {
        try {
        //   const res = await clientAxios.delete(`http://localhost:4000/api/v1/product/${productId}`);
        //   res && await getProducts();
        } catch (error) {
          throw error;
        }
      };

    return (
        <CarrerasContext.Provider value={{
            ...values,
            getCarreras,
            getCarrera,
        }}>
            {children}
        </CarrerasContext.Provider>
    );
};

export default CarrerasProvider;