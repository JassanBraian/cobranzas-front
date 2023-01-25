import React from 'react';

const PrecioCuoItem = ({ precioCuo, index }) => {
    return (
        <>
            <tr>
                <td> {index + 1} </td>
                <td> ${precioCuo.monto} </td>
                <td> {precioCuo.fecha} </td>
            </tr>
        </>
    );
};

export default PrecioCuoItem;