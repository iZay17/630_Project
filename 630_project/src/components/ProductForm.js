import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../FormStyles.css';

const ProductForm = ({ fetchProducts, product, closeForm }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setId(product.id);
      setName(product.name);
      setCode(product.code);
      setImage(product.image);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      id: id,
      name: name,
      code: code,
      image: image,
      price: price,
    };

    try {
      if (product) {
        await axios.put('http://localhost/630_Project/api/products/products2.php', productData).then(function(response) {
          console.log(response);
        });
      } else {
        await axios.post('http://localhost/630_Project/api/products/products2.php', productData).then(function(response) {
          console.log(response);
        });;
      }
      fetchProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="code">Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
