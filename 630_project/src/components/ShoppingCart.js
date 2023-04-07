import React from 'react';
import {useState, useEffect} from 'react';
import CartItem from './CartItem.js';
import {Link} from 'react-router-dom';
import '../style2.css';

const ShoppingCart = () => {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        updateCart();
        window.addEventListener('storage', () => {
            updateCart();
        });
        
    }, [])

    const updateCart = () => {
        if(window.localStorage.length > 2) {
            var placeholder = [];
            for (let i = 0; i < window.localStorage.length; i++) {
                if (localStorage.key(i) != "email" && localStorage.key(i) != "user_name"){
                    placeholder.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                } else {
                    continue;
                }
            }
            setItems(placeholder);
            var t = 0;
            var tq = 0;
            var st = 0;
            for (let i = 0; i < placeholder.length; i++) {
                tq += placeholder[i].Amount;
                st += (placeholder[i].Price*placeholder[i].Amount);
                t += (placeholder[i].Price*placeholder[i].Amount)*1.13;
            }
            setTotalQuantity(tq);
            setSubtotal(parseFloat(st.toFixed(2)));
            setTotal(parseFloat(t.toFixed(2)));
        } else {
            setItems([]);
        }
    }

    const clearCart = () => {
        let count = window.localStorage.length;
        let iter = count - 1;
        for (var i = 0; i < count; i++) {
            if (localStorage.key(iter) != "email" && localStorage.key(iter) != "user_name") {
                console.log(localStorage.key(iter)); 
                localStorage.removeItem(localStorage.key(iter));
            }
            iter -= 1;
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
                    <th style={{textAlign: 'right'}} width="10%">Price(+Tax)</th>
                    <th style={{textAlign: 'center'}} width="5%">Remove</th>
                </tr>
                	{items && items.map((item, index) => {
                        return <CartItem key={index} title={item.Name} price={item.Price} img={item.Image} quantity={item.Amount} code={item.Code} />
                    })}
                <tr>
                    <td colspan="2" align="right"><strong>Total:</strong></td>
                    <td align="right"><strong>{totalQuantity}</strong></td>
                    <td align="right" colspan="2"><strong>${subtotal}</strong></td>
                    <td align="right"><strong>${total}</strong></td>
                    <td align="right"><strong><Link to="/Invoice"><button>Checkout</button></Link></strong></td>
                </tr>
            </tbody>
            </table>	

        </div>
    )
}

export default ShoppingCart