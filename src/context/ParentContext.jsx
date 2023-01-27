import React from 'react';
import AlumnoProvider from './alumno/AlumnoProvider';
import CarrerasProvider from './carrera/CarrerasProvider';
import PrecioCuoProvider from './precioCuota/PrecioCuoProvider';
import AlumCarreraProvider from './alumCarrera/AlumCarreraProvider';

const ParentContext = ({ children }) => {
    return (
        <PrecioCuoProvider>
            <CarrerasProvider>
                <AlumnoProvider>
                    <AlumCarreraProvider>
                        {children}
                    </AlumCarreraProvider>
                </AlumnoProvider>
            </CarrerasProvider>
        </PrecioCuoProvider>
    );
};

export default ParentContext;