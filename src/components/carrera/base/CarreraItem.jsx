import { useContext, useEffect } from 'react';
import CarreraContext from '../../../context/carrera/CarrerasContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const CarreraItem = ({ carrera, index, openEditModal, openDeleteModal }) => {

    const { getCarrera } = useContext(CarreraContext);

    return (
        <>
            <tr>
                <td> {index + 1} </td>
                <td> {carrera.nombre} </td>
                <td> ${carrera.precioCuo} </td>
                <td className="text-center">
                    <Button
                        variant="warning"
                        className='me-2'
                        onClick={() => {
                            getCarrera(carrera.id);
                            openEditModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            getCarrera(carrera.id);
                            openDeleteModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default CarreraItem;