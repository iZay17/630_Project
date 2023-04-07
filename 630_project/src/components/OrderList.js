import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './OrderForm';
import '../ListStyles.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost/630_Project/api/orders/orders.php`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleForm = (order) => {
    setSelectedOrder(order);
    setShowForm(!showForm);
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost/630_Project/api/orders/orders.php?id=${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="list-container">
      <h2>Orders</h2>
      <button onClick={() => toggleForm(null)}>Add Record</button>
      {showForm && (
        <div className="form-container">
          <OrderForm fetchOrders={fetchOrders} order={selectedOrder} closeForm={() => setShowForm(false)}/>
        </div>
      )}
      <table>        
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.Order_Id}</td>
              <td>{order.product_id}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price}</td>
              <td>{order.order_date}</td>    
              <td className="action-buttons">
                <button onClick={() => toggleForm(order)}>Edit</button>
                <button onClick={() => deleteOrder(order.order_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
