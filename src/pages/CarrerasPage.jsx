import React from 'react';
import CarreraList from '../components/carrera/base/CarreraList';
import '../css/common/base-page.css';

const CarrerasPage = () => {
    return (
        <>
            <div className='app'>
                <CarreraList />
            </div>
        </>

    );
};

export default CarrerasPage;