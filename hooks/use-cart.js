import { useState, createContext, useContext, useEffect } from 'react';
import products from '../products.json'

import {initiateCheckout} from '../lib/payments.js'
const defaultCart = {
    products: {}
  }

export const CartContext = createContext();

export  function useCartState(){
    const [cart, updateCart] = useState(defaultCart);

    useEffect(()=>{
        const stateFromStorage = window.localStorage.getItem('shop_cart');
        const data = stateFromStorage && JSON.parse(stateFromStorage);
        if ( data ) {
            updateCart(data);
        }
    },[])


    useEffect(() =>{
        const data = JSON.stringify(cart);
        window.localStorage.setItem('shop_cart',data)
    }, [cart])

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

export function useCart(){
    const cart = useContext(CartContext);
    return cart
}