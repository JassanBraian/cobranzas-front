import React from 'react';
import CarrerasProvider from './carrera/CarrerasProvider';
import PrecioCuoProvider from './precioCuota/PrecioCuoProvider';

const ParentContext = ({ children }) => {
    return (
        <PrecioCuoProvider>
            <CarrerasProvider>
                {children}
            </CarrerasProvider>
        </PrecioCuoProvider>
    );
};

export default ParentContext;