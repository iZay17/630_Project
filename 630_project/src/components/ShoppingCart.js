import React from 'react';
import {useState, useEffect} from 'react';
import CartItem from './CartItem.js';
import '../style2.css';

const ShoppingCart = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        updateCart();
        window.addEventListener('storage', () => {
            updateCart();
        });
        
    }, [])

    const updateCart = () => {
        if(window.localStorage.length > 2) {
            var placeholder = [];
            for (var i = 0; i < window.localStorage.length; i++) {
                if (localStorage.key(i) != "email" && localStorage.key(i) != "user_name"){
                    placeholder.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    setItems(placeholder);
                } else {
                    continue;
                }
            }
        } else {
            setItems([]);
        }
    }

    const clearCart = () => {
        for (var i = 0; i < window.localStorage.length; i++) {
            console.log(localStorage.key(i));
            if (localStorage.key(i) != "email" && localStorage.key(i) != "user_name") {
                localStorage.removeItem(localStorage.key(i));
            } else {
                continue;
            }
        } 
        setItems([]);
    }

    function allowDrop(e) 
	{
		e.preventDefault();
	}
    
    function drop(e) 
    {
        e.preventDefault();

    }


    return (
        <div id="shopping-cart">
            <div class="txt-heading">Shopping Cart</div>
            <button id="btnEmpty" onClick={clearCart} >Empty Cart</button>
            <table class="tbl-cart" cellpadding="10" cellspacing="1">
            <tbody onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
                <tr>
                    <th style={{textAlign: 'left'}}>Name</th>
                    <th style={{textAlign: 'left'}}>Code</th>
                    <th style={{textAlign: 'right'}} width="5%">Quantity</th>
                    <th style={{textAlign: 'right'}} width="10%">Unit Price</th>
                    <th style={{textAlign: 'right'}} width="10%">Price</th>
                    <th style={{textAlign: 'center'}} width="5%">Remove</th>
                </tr>
                	{items && items.map((item, index) => {
                        return <CartItem key={index} title={item.Name} price={item.Price} img={item.Image} quantity={item.Amount} code={item.Code} />
                    })}
                <tr>
                    <td colspan="2" align="right">Total:</td>
                    <td align="right"></td>
                    <td align="right" colspan="2"><strong></strong></td>
                    <td></td>
                </tr>
            </tbody>
            </table>	

        </div>
    )
}

export default ShoppingCart