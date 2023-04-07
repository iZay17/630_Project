import React from 'react';

const InvoiceItem = (props) => {
    
    return (
                <tr>
                    <td>{props.name}</td>
                    <td>{props.quantity}</td>
                    <td>{props.price}</td>
                    <td>{props.total}</td>
                </tr>
    )
}

export default InvoiceItem;