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

    return (
        <CarrerasContext.Provider value={{
            ...values,
            getCarreras,
        }}>
            {children}
        </CarrerasContext.Provider>
    );
};

export default CarrerasProvider;