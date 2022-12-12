import { useContext } from 'react';
import CarreraContext from '../../../context/carrera/CarrerasContext';
import { Button } from 'bootstrap';

const CarreraItem = (carrera, index, openEditModal, openDeleteModal) => {

    const { getCarrera } = useContext(CarreraContext);

    return (
        <>
            <tr>
                <td> {index + 1} </td>
                <td> {carrera.nombre} </td>
                <td className="actions-column">
                    <Button
                        variant="info"
                        onClick={() => {
                            getCarrera(carrera._id);
                            openEditModal();
                        }}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            getCarrera(carrera._id);
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