import { useContext } from 'react';
import PrecioCuoItem from '../base/PrecioCuoItem';
import { Table } from 'react-bootstrap';
import PreciosCuoContext from '../../../context/precioCuota/PrecioCuoContext';

const PrecioCuoList = () => {

    const { preciosCuo } = useContext(PreciosCuoContext);

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        preciosCuo ?
                            preciosCuo.map((precioCuo, index) =>
                                <PrecioCuoItem
                                    precioCuo={precioCuo}
                                    key={index}
                                    index={index}
                                />
                            )
                            :
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No posee precios de cuotas cargadas
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </>
    );
};

export default PrecioCuoList;