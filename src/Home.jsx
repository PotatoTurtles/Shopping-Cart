import { useEffect, useState } from 'react'
import { Link } from "react-router";
import { useOutletContext } from 'react-router';
import styles from './home.module.css'

export default function Home(){
    const [cart,setCart,isHighlighted,setIsHighlighted] = useOutletContext();
    useEffect(()=>{
        setIsHighlighted([1,0,0]);
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.bkrnd}>
                <h1>Welcome to Super Shop!</h1>
                <Link to={'/store'}><button>Shop Now</button></Link>
            </div>
        </div>
    )
}