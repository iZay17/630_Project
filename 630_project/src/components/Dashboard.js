import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import OrderList from './OrderList';
import ReviewList from './ReviewList';
import '../Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-navigation">
        <Link to="/products/add" className="dashboard-link">
          Add Product
        </Link>
        <Link to="/orders/add" className="dashboard-link">
          Add Order
        </Link>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-products">
          <h2>Products</h2>
          <ProductList/>
        </div>
        <div className="dashboard-orders">
          <h2>Orders</h2>
          <OrderList/>
        </div>
        <div className="dashboard-reviews">
          <h2>Reviews </h2>
          <ReviewList/>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
