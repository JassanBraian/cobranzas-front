import React from 'react';
import AlumnoProvider from './alumno/AlumnoProvider';
import CarrerasProvider from './carrera/CarrerasProvider';
import PrecioCuoProvider from './precioCuota/PrecioCuoProvider';
import AlumCarreraProvider from './alumCarrera/AlumCarreraProvider';
import CuotaProvider from './cuota/CuotaProvider';
import PagoCuotaProvider from './pagoCuota/PagoCuotaProvider';

const ParentContext = ({ children }) => {
    return (
        <PrecioCuoProvider>
            <CarrerasProvider>
                <AlumnoProvider>
                    <AlumCarreraProvider>
                        <CuotaProvider>
                            <PagoCuotaProvider>
                                {children}
                            </PagoCuotaProvider>
                        </CuotaProvider>
                    </AlumCarreraProvider>
                </AlumnoProvider>
            </CarrerasProvider>
        </PrecioCuoProvider>
    );
};

export default ParentContext;