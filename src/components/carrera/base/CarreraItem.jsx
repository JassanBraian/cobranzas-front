import { useContext, useEffect } from 'react';
import CarreraContext from '../../../context/carrera/CarrerasContext';
import { Button } from 'react-bootstrap';

const CarreraItem = ({ carrera, index, openEditModal, openDeleteModal }) => {

    const { getCarrera } = useContext(CarreraContext);

    return (
        <>
            <tr>
                <td> {index + 1} </td>
                <td> {carrera.nombre} </td>
                <td className="text-center">
                    <Button
                        variant="info"
                        onClick={() => {
                            getCarrera(carrera.id);
                            openEditModal();
                        }}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            getCarrera(carrera.id);
                            openDeleteModal();
                        }}
                    >
                        Eliminar
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default CarreraItem;