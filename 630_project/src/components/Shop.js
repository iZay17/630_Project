import ShoppingItems from './ShoppingItems'
import ShoppingCart from './ShoppingCart'
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../CPS630_Project.css';

const Shop = () =>{
  
  const [items, setItems] = useState('');
  useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    axios.get('http://localhost/630_Project/api/products/Products.php')
    .then(function(response) {
      setItems(response.data);
    })
  }

  return (
    <>
    <ShoppingCart />
    <section className='booklist' >
      {items && items.map((item, index) => {
        return <ShoppingItems key={index} item={item} title={item.name} price={item.price} img={item.image} code={item.code}></ShoppingItems>;
      })}
    </section>
    </>
  );
}

export default Shop;