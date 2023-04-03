import React from 'react';
import {useState} from 'react';
import '../style2.css';


const ShoppingItems = (props) => {
  const [quantity, setQuantity] = useState(1);
  
 // attribute, eventHandler
 // onClick, onMouseOver
 
  const addToCart = () => {
    if (localStorage.getItem(props.code) !== null){
      var count = Number((JSON.parse(localStorage.getItem(props.code)).Amount)) + Number(quantity);
      const item = {
        Name: props.title,
        Code: props.code, 
        Image: props.img, 
        Price: props.price, 
        Amount: count
      };
      localStorage.setItem(props.code, JSON.stringify(item));
      window.dispatchEvent(new Event("storage"));
    } else {
      const item = {
        Name: props.title,
        Code: props.code, 
        Image: props.img, 
        Price: props.price, 
        Amount: quantity
      };
      localStorage.setItem(props.code, JSON.stringify(item));
      window.dispatchEvent(new Event("storage"));
    }
    
  };

  const handleDragEnd = () => {
    addToCart();
  }   
  
  function drag(e) 
  {
    e.dataTransfer.setData("Item", e.target.id);
  }

 return (
  <article className='item' class="product-item" draggable="true" onDragStart={(e) => drag(e)} onDragEnd={handleDragEnd}>
   <div class="product-image"><img src={props.img} alt='' /></div>
   <div class="product-title">{props.title}</div>
   <div><h4>{props.price}</h4></div>
   <input type="number" value={quantity} min="1" max="50" onChange={(e) => setQuantity(e.target.value)}/>
   <input type='submit' value="Add to Cart" onClick={() => addToCart()}/>
  </article>
 );
};

export default ShoppingItems

