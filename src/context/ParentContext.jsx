import React from 'react';
import CarrerasProvider from './carrera/CarrerasProvider';

const ParentContext = ({ children }) => {
    return (
        <CarrerasProvider>
            {children}
        </CarrerasProvider>
    );
};

export default ParentContext;