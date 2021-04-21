import { useState } from 'react';
import products from '../products.json'

import {initiateCheckout} from '../lib/payments.js'
const defaultCart = {
    products: {}
  }

export default function useCart(){
    const [cart, updateCart] = useState(defaultCart);
    const cartItems = Object.keys(cart.products).map(key => {
        const product = products.find(({id}) => `${id}` === `${key}`);
        return{
          ...cart.products[key],
          pricePerItems: product.price
        }
      });
        
      const subtotal = cartItems.reduce((accumulator, { pricePerItems, quantity })=> {
        return accumulator + ( pricePerItems * quantity)
      }, 0)
      const totalItems = cartItems.reduce((accumulator, { quantity })=> {
        return accumulator + quantity
      }, 0)
      console.log('subtotal',subtotal)
    
      function addToCart({ id } = {}){
        updateCart(prev => {
          let cartState = {...prev};
     
          if ( cartState.products[id] ){
            cartState.products[id].quantity = cartState.products[id].quantity + 1;
          } else {
            cartState.products[id] = {
              id,
              quantity: 1
            }
          }
          return cartState; 
        })
      }
      function  checkout(){
        initiateCheckout({
          lineItems: cartItems.map(item =>{
            return{
              price: item.id,
              quantity: item.quantity
            }
          })
        })
      }
    return {
        cart,
        updateCart,
        subtotal,
        totalItems,
        addToCart,
        checkout


    };
}