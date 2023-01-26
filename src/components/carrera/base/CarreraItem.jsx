import { useContext, useEffect } from 'react';
import CarreraContext from '../../../context/carrera/CarrerasContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import PrecioCuoContext from '../../../context/precioCuota/PrecioCuoContext';

const CarreraItem = ({ carrera, index, openEditModal, openDeleteModal, openHistoryPrecioCuoMod }) => {

    const { getCarrera } = useContext(CarreraContext);
    const { getPreciosCuoByCarrId } = useContext(PrecioCuoContext);

    return (
        <>
            <tr>
                <td> {index + 1} </td>
                <td> {carrera.descripcion} </td>
                <td> {carrera.cantCuotas} </td>
                <td> ${carrera.precioCuo} </td>
                <td className="text-center">
                    <Button
                        variant="success"
                        className='me-2'
                        onClick={() => {
                            getPreciosCuoByCarrId(carrera.id)
                            openHistoryPrecioCuoMod();
                        }}
                    >
                        <FontAwesomeIcon icon={faMoneyCheckDollar} />
                    </Button>
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