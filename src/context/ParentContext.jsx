import React from 'react';
import AlumnoProvider from './alumno/AlumnoProvider';
import CarrerasProvider from './carrera/CarrerasProvider';
import PrecioCuoProvider from './precioCuota/PrecioCuoProvider';

const ParentContext = ({ children }) => {
    return (
        <PrecioCuoProvider>
            <CarrerasProvider>
                <AlumnoProvider>
                    {children}
                </AlumnoProvider>
            </CarrerasProvider>
        </PrecioCuoProvider>
    );
};

export default ParentContext;