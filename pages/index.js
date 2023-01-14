import { Comic } from '@next/font/google';
import styles from '../styles/Home.module.scss';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { render } from '../components/render';
import { Interweave } from 'interweave';
import MintComp from '../components/mint';


export default function Home() {


  //-----------------------------scroll price stuff-------------------------------------------------------------------
  const [scrollY, setScrollY] = useState(0);
  const onScroll = useCallback(event => {
    const { pageYOffset, scrollY } = window;
    //console.log("yOffset", pageYOffset, "scrollY", scrollY);
    setScrollY(window.pageYOffset);
    setPrice(Math.round(window.pageYOffset));

}, []);

useEffect(() => {
  //add eventlistener to window
  window.addEventListener("scroll", onScroll, { passive: true });
  // remove event on unmount to prevent a memory leak with the cleanup
  return () => {
     window.removeEventListener("scroll", onScroll, { passive: true });
  }
}, []);

const [price, setPrice] = useState(0);








//--------------------text animations---------------------------------------------------
  const [tag1, tag1View] = useInView();

  


  const scrollEvent = (e) => {
    setPrice(e.target.scrollTop);
    console.log('pos', (e.target.scrollTop).toString());
 

  }

  useEffect(() => {

    if(tag1View){
      scrollControl.start("hidden");
      tag1Control.start("visible");
      tag2Control.start("visible");
      
    } 
else {

      tag1Control.start("hidden");
      tag2Control.start("hidden");
      scrollControl.start("visible");
    }
  },)


  //---------motion variants-------------------------------------------------------
  const scrollControl = useAnimation();
  const scrollVariant = {
    visible: {opacity:1, scale: 1},
    hidden: {opacity: 0, scale: 0},
  }

  const tag1Control = useAnimation();
  const tag1Variant = {
    visible: {opacity:1, scale: 1, transition:{duration: .5, delay: .15}},
    hidden: {opacity: 0, scale: 0},
  }


  const tag2Control = useAnimation();
  const tag2Variant = {
    visible: {opacity:1, scale: 1, transition:{type: "spring", damping: 10, stiffness: 100, duration: .5, delay: .15}},
    hidden: {opacity: 0, scale: 0},
  }





//--------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.main} >

    <img className={styles.svg} src={`data:image/svg+xml;utf8,${encodeURIComponent(render(price+500))}`} />
    <div  className={styles.pricediv}> <h1 className={styles.priceh1}>${price+500}</h1></div>
    
    <MintComp />
    
        <div className={styles.info}>
          
        <motion.h2
          variants={scrollVariant}
          animate={scrollControl}
          initial="visible"
          className={styles.scroll}
        >
          scroll
        </motion.h2>
        <motion.h1
        ref={tag1}
        variants={tag1Variant}
        animate={tag1Control}
        initial="hidden"
        className={styles.dynamic}
        >
          Dynamic
        </motion.h1>
        <motion.h1
        ref={tag1}
        variants={tag2Variant}
        animate={tag2Control}
        initial="hidden"
        className={styles.dynamic}
        >
         On Chain
        </motion.h1>
        <motion.h1
        ref={tag1}
        variants={tag2Variant}
        animate={tag2Control}
        initial="hidden"
        className={styles.dynamic}
        >NFT
        </motion.h1>
        <motion.h1
        ref={tag1}
        variants={tag1Variant}
        animate={tag1Control}
        initial="hidden"
        className={styles.chainlink}
        >
          Oracles
        </motion.h1>
     
        <h2 className={styles.how}>but how......?</h2>
        <div className={styles.desc}>
          <h3>Live Price</h3>
          <p>
          Instead of using chainlink oracles to calculate the ETH/USDC price, and achieve pure randomness among traits I used the power of the blockchain.
          </p>
          <br/>
          <p>
          This is achieved by calculating the price from the ETH/USDC Uniswap V3 liquidity pool (0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8).
          </p>
          <br/>
          <p>
          The price is then used as a variable to render an emotion into the on chain svg.
          </p>
          <br/>
          <h3>Unique traits</h3>
          <p>
          No two frogs are the same. The pastel shades of each trait are created by hashing the trait id and token id then converting the hash to an hsl color code.
          </p>
          <br/>
          Note that this is not associated with the official Pepe. This is a eth/usdc price indicatir that is paying homage to the popular meme in a unique way.
          <br/>
          Made w ❤️ by mason.og
        </div>
        
        <div className={styles.spacer} />
        
        </div>
        


      </div> 
    </>
  )
}
