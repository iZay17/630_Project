import React from 'react';
import {useState} from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import "../checkout.css"

const Checkout = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [cardType, setCardType] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = year + "-" + month + "-" + day;

    const handleSubmit = event => {
        event.preventDefault();
        console.log(JSON.parse(localStorage.getItem(localStorage.key(4))).Code);
        const errors = validateInputs();
        if (Object.keys(errors).length === 0) {
        // Submit the form if there are no errors
        // Your submit logic goes here
        console.log(JSON.parse(localStorage.getItem(localStorage.key(4))).Code);
        for (var i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i) !== "email" && localStorage.key(i)  !== "user_name") {  
                let formData = new FormData();
                formData.append("user", localStorage.getItem("email"));
                formData.append("product_id", JSON.parse(localStorage.getItem(localStorage.key(i))).Code);
                formData.append("quantity", JSON.parse(localStorage.getItem(localStorage.key(i))).Amount);
                formData.append("total_price", JSON.parse(localStorage.getItem(localStorage.key(i))).Price);
                formData.append("paymentcode", cardType);
                formData.append("date_issued", fullDate);

                const orderData = {
                    product_id: JSON.parse(localStorage.getItem(localStorage.key(i))).Code,
                    total_price: JSON.parse(localStorage.getItem(localStorage.key(i))).Price,
                    user: localStorage.getItem("email"),
                    quantity: JSON.parse(localStorage.getItem(localStorage.key(i))).Amount,
                    date_issued: fullDate,
                    paymentcode: cardType
                  };
             
                axios.post("http://localhost/630_Project/api/orders/orders.php", orderData).then(function(response) {
                    console.log(response.data);
                })
            }
        }

            console.log("Form submitted successfully!");
            navigate("/PaymentConfirmation");
        } else {
        setFormErrors(errors);
        }
    };

    const validateInputs = () => {
        const errors = {};
        if (!name.trim()) {
        errors.name = "Name is required";
        }
        if (!email.trim()) {
        errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
        }
        if (!phone.trim()) {
        errors.phone = "Phone number is required";
        } else if (!/^[0-9+\(\)#\.\s\/ext-]+$/i.test(phone)) {
        errors.phone = "Phone number is invalid";
        }
        if (!address.trim()) {
        errors.address = "Address is required";
        }
        if (!cardType) {
        errors.cardType = "Card type is required";
        }
        if (!cardNumber.trim()) {
        errors.cardNumber = "Card number is required";
        } else if (!/^[0-9]{16}$/.test(cardNumber)) {
        errors.cardNumber = "Card number is invalid";
        }
        if (!expiry.trim()) {
        errors.expiry = "Expiry date is required";
        } else if (!/^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/.test(expiry)) {
        errors.expiry = "Expiry date is invalid";
        }
        if (!cvv.trim()) {
        errors.cvv = "CVV is required";
        } else if (!/^[0-9]{3,4}$/.test(cvv)) {
        errors.cvv = "CVV is invalid";
        }
        return errors;
    };

    return (
            <div class="container">
                <h1>Checkout</h1>
                <form onSubmit={handleSubmit}>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required/>

                    {formErrors.name ? <p>{formErrors.name}</p> : ""}

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    {formErrors.email ? <p>{formErrors.email}</p> : ""}

                    <label for="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required/>

                    {formErrors.phone ? <p>{formErrors.phone}</p> : ""}

                    <label for="address">Address:</label>
                    <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>

                    {formErrors.address ? <p>{formErrors.address}</p> : ""}

                    <label for="card-type">Card Type:</label>
                    <select id="card-type" name="card-type" value={cardType} onChange={(e) => setCardType(e.target.value)} required>
                        <option value="">Select a card type</option>
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="american-express">American Express</option>
                    </select>

                    {formErrors.cardType ? <p>{formErrors.cardType}</p> : ""}    

                    <label for="card-number">Card Number:</label>
                    <input type="text" id="card-number" name="card-number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required/>

                    {formErrors.cardNumber ? <p>{formErrors.cardNumber}</p> : ""}

                    <label for="expiry">Expiry Date:</label>
                    <input type="text" id="expiry" name="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} required placeholder="MM / YY"/>

                    {formErrors.expiry ? <p>{formErrors.expiry}</p> : ""}

                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required/>

                    {formErrors.cvv ? <p>{formErrors.cvv}</p> : ""}

                    <input type="submit" value="Place Order"/>
                </form>
                <Link to="/Shop"><button>Back To Cart</button></Link>
            </div>
    )
}

export default Checkout;