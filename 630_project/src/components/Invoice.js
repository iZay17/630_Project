import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import InvoiceItem from './InvoiceItem';
import "../invoice.css";

function Invoice() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = day + "/" + month + "/" + year;
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [subtotal, setSubtotal] = useState(0); 

    useEffect(() => {
        getCartItems();
    }, [])

    const getCartItems = () => {
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

    return (
        <div class="invoice-container">
        <div class="company-details">
            <img src="http://localhost/630_Project/Assets/company-logo.png" alt="Company Logo" class="company-logo"/>
            <p>Smart Shop</p>
            <p>350 Victoria St, Toronto, M5B 2K3</p>
            <p>Phone: (416)-979-5000</p>
            <p>Email: info@smartshop.ca</p>
        </div>
        <div class="invoice-details">
            <h1>Invoice</h1>
            <p>Date: {fullDate}</p>
        </div>
        <div class="customer-details">
            <h3>Customer Details</h3>
            <p>{localStorage.getItem("user_name")}</p>
            <p>Email: {localStorage.getItem("email")}</p>
        </div>
        <table class="items-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {items && items.map((item, index) => {
                    return <InvoiceItem key={index} name={item.Name} quantity={item.Amount} price={item.Price} total={item.Price*item.Amount}/>
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Subtotal</td>
                    <td>${subtotal}</td>
                </tr>
                <tr>
                    <td colspan="3">Tax (13%)</td>
                    <td>${total - subtotal}</td>
                </tr>
                <tr>
                    <td colspan="3">Total</td>
                    <td>${total}</td>
                </tr>
            </tfoot>
        </table>
        <Link to="/Shop"><button>Back To Cart</button></Link>
        <Link to="/Checkout"><button>Payment Info</button></Link>
    </div>
    )
}   

export default Invoice;