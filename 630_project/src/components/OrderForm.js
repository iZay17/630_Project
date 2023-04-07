import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../FormStyles.css';

const OrderForm = ({ fetchOrders, order, closeForm }) => {
  const [orderId, setOrderId] = useState('');
  const [productId, setProductId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    if (order) {
      setOrderId(order.order_id);
      setProductId(order.product_id);
      setCustomerId(order.customer_id);
      setQuantity(order.quantity);
      setOrderDate(order.order_date);
    }
  }, [order]);

  const handleChange = (event) => {
    setOrderId(event.target.value);
    setProductId(event.target.value);
    setCustomerId(event.target.value);
    setQuantity(event.target.value);
    setOrderDate(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      order_id: orderId,
      product_id: productId,
      customer_id: customerId,
      quantity: quantity,
      order_date: orderDate,
    };

    try {
      if (order) {
        await axios.put('http://localhost/630_Project/api/orders/orders.php', orderData);
      } else {
        await axios.post('http://localhost/630_Project/api/orders/orders.php', orderData);
      }
      fetchOrders();
      closeForm();
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order Number:
        <input type="text" name="order_number" value={order.order_number} onChange={handleChange}/>
      </label>

      <label>
        Product ID:
        <input
          type="number"
          name="product_id"
          value={order.product_id}
          onChange={handleChange}
        />
      </label>

      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={order.quantity}
          onChange={handleChange}
        />
      </label>

      <label>
        Total Price:
        <input
          type="number"
          name="total_price"
          value={order.total_price}
          onChange={handleChange}/>
      </label>

      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
