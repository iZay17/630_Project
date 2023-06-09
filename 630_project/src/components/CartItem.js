import React from 'react'
import {useEffect, useState} from 'react'
import '../style2.css'

const CartItem = ({title, price, img, quantity, code}) => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        var tot = quantity*price;
        setTotal(tot);
    })

    const removeItem = () => {
        localStorage.removeItem(code);
    }

    return (
        <tr>
                    <td><img src={img} class="cart-item-image" />{title}</td>
                    <td>{code}</td>
                    <td style={{textAlign: 'right'}}>{quantity}</td>
                    <td  style={{textAlign: 'right'}}>${price}</td>
                    <td  style={{textAlign: 'right'}}>${total}</td>
                    <td style={{textAlign: 'center'}}><button onClick={removeItem} class="btnRemoveAction"><img src="http://localhost/630_Project/Assets/icon-delete.png" alt="Remove Item" /></button></td>
		</tr>
    )
}

export default CartItem 