import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import '../ListStyles.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost/630_Project/api/products/products2.php');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost/630_Project/api/products/products2.php?id=${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="list-container">
      <h2>Products</h2>
      <button onClick={toggleForm}>Edit/Add Record</button>
      {showForm && <ProductForm fetchProducts={fetchProducts} />}
      <button type="button" onClick={toggleForm}>
            Cancel
      </button>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Code</th>
          <th>Image</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.code}</td>
            <td>
              <img src={product.image} alt={product.name} width="100" />
            </td>
            <td>${(parseFloat(product.price)).toFixed(2)}</td>
            <td>
                <button onClick={() => toggleForm(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
