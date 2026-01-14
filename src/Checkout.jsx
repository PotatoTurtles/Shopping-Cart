import { useEffect, useState } from 'react'
import { Link } from "react-router";
import styles from './checkout.module.css'

export default function Checkout({cart,setCart,isHighlighted,setIsHighlighted}){

    function combineCart(){
        let temp = []
        cart.forEach(elem => {
            let sum = 0;
            let match = temp.filter((e)=>{
                if(e.data.title==elem.data.title){
                    sum = e.quantity+elem.quantity;
                    return false
                }
                return true
            })
            if(sum>elem.quantity){
                temp=[...match,{quantity:sum,data:elem.data}];
            }else{
                temp.push(elem);
            }
        });
        console.log(temp)
        return temp
    }

    function toSet(callback, title, val) {
        callback(prev =>
            prev.map(item =>
            item.data.title === title
                ? { ...item, quantity: val }
                : item
            )
        );
    }

    return(
        <nav className={`${styles.container} ${isHighlighted[2]&&styles.expand}`}>
            <div className={`${styles.links} ${isHighlighted[2]&&styles.sideways}`}>
                <Link to={'/'} className={ `${styles.link} ${isHighlighted[0]&&styles.darker}`} onClick={()=>setIsHighlighted([1,0,0])}>
                    <svg className={styles.img} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
                </Link>
                <Link to={'store'} className={ `${styles.link} ${isHighlighted[1]&&styles.darker}`} onClick={()=>setIsHighlighted([0,1,0])}>
                    <svg className={styles.img} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>storefront</title><path d="M5.06 3C4.63 3 4.22 3.14 3.84 3.42C3.46 3.7 3.24 4.06 3.14 4.5L2.11 8.91C1.86 10 2.06 10.92 2.69 11.73C2.81 11.85 2.93 11.97 3.04 12.07C3.63 12.64 4.28 13 5.22 13C6.16 13 6.91 12.59 7.47 12.05C8.1 12.67 8.86 13 9.8 13C10.64 13 11.44 12.63 12 12.07C12.68 12.7 13.45 13 14.3 13C15.17 13 15.91 12.67 16.54 12.05C17.11 12.62 17.86 13 18.81 13C19.76 13 20.43 12.65 21 12.06C21.09 11.97 21.18 11.87 21.28 11.77C21.94 10.95 22.14 10 21.89 8.91L20.86 4.5C20.73 4.06 20.5 3.7 20.13 3.42C19.77 3.14 19.38 3 18.94 3M18.89 4.97L19.97 9.38C20.06 9.81 19.97 10.2 19.69 10.55C19.44 10.86 19.13 11 18.75 11C18.44 11 18.17 10.9 17.95 10.66C17.73 10.43 17.61 10.16 17.58 9.84L16.97 5M5.06 5H7.03L6.42 9.84C6.3 10.63 5.91 11 5.25 11C4.84 11 4.53 10.86 4.31 10.55C4.03 10.2 3.94 9.81 4.03 9.38M9.05 5H11V9.7C11 10.05 10.89 10.35 10.64 10.62C10.39 10.88 10.08 11 9.7 11C9.36 11 9.07 10.88 8.84 10.59C8.61 10.3 8.5 10 8.5 9.66V9.5M13 5H14.95L15.5 9.5C15.58 9.92 15.5 10.27 15.21 10.57C14.95 10.87 14.61 11 14.2 11C13.89 11 13.61 10.88 13.36 10.62C13.11 10.35 13 10.05 13 9.7M3 14.03V19C3 20.11 3.89 21 5 21C9.67 21 14.33 21 19 21C20.1 21 21 20.11 21 19V14.05C20.45 14.63 19.75 14.96 19 15C18 15.03 17.25 14.74 16.54 14.05C15.94 14.65 15.14 15 14.3 15C13.4 15 12.6 14.64 12 14.07C11.43 14.64 10.65 15 9.78 15C8.87 15 8.07 14.65 7.47 14.05C6.89 14.64 6.1 15 5.23 15C4.33 15 3.66 14.65 3 14.03Z" /></svg>                
                </Link>
                <div className={ `${styles.link} ${isHighlighted[2]&&styles.darker}`} onClick={()=>setIsHighlighted([0,0,1])}>
                    <svg className={styles.img} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cart</title><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" /></svg>               
                </div>
            </div>
            {!!isHighlighted[2]&&<div className={styles.items}>
                {!!isHighlighted[2]&&cart.map((e,i)=>{
                    return(
                        <div key={e.data.title} className={styles.item}>
                            <p className={styles.parg}>{e.data.title}</p>
                            <div className={`${styles.quantity}`}>
                                <button className={`${styles.bubble} ${styles.red}`} onClick={()=>{
                                    if(e.quantity-1<=0){
                                        toSet(setCart, e.data.title, 0);
                                    }
                                    else{
                                        toSet(setCart, e.data.title, e.quantity-1);
                                    }
                                }
                                }>-</button>
                                <input type="number" min='0' value={e.quantity} onChange={(elem)=> toSet(setCart, e.data.title, Math.floor(+elem.target.value))} className={`${styles.inp} ${styles.bubble}`}/>
                                <button className={`${styles.bubble} ${styles.green}`} onClick={()=>toSet(setCart, e.data.title, e.quantity + 1)}>+</button>
                            </div>
                        </div>
                    )
                })}
            </div>}
            {!!isHighlighted[2]&&<div className={styles.total}>
                <h2 >Total: <span>${Math.floor(cart.reduce((sum,e)=>sum + e.quantity*e.data.price,0)*100)/100}</span></h2>
                <button className={styles.checkout}>Checkout</button>
            </div>}
        </nav>
    )
}