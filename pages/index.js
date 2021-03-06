import { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css' 
import { FaShoppingCart } from 'react-icons/fa'
import products from '../products.json'




import { useCart } from '../hooks/use-cart.js';



export default function Home() {
  //console.log('NEXT_PUBLIC_STRIPE_API_KEY', process.env.NEXT_PUBLIC_STRIPE_API_KEY);
  const { subtotal, totalItems, addToCart, checkout} = useCart();
 

  
  
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Eason's Books Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Books Shop!
        </h1>

        <p className={styles.description}>
          Ministry books
        </p>
        <p className={styles.description}>
          <strong>Items:</strong> { totalItems }
          <br />
          <strong>Total Cost: </strong> $ { subtotal }
          <br />
          <button className={styles.button} onClick = {checkout}>Check Out</button>
        </p>

        <ul className={styles.grid}>
          {products.map(product => {
            const{id,title,price,description,image} = product;
            return(
              <li key={id} className={styles.card}>
                <a href="#">
                <img src={image} alt={title}></img>
                <h3>{title} </h3>
                <p>${price}</p>
                <p>{description}</p>
              </a>
              <button className={styles.button} onClick={() =>{
                addToCart({
                  id
                })
         
                
              } }>Add to cart</button>
          </li>
            )
          })}
                  
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
