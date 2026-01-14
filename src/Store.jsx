import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router';
import styles from './store.module.css'


export default function Store(){
    let img = ()=>{
        let arr =[];
        let num = Math.floor(Math.random()*16)+5;
        for(let i = 0;i<num;i++){
            let newVal = Math.floor(Math.random()*20)+1;
            arr.includes(newVal)?--i:arr.push(newVal);
        }
        return arr
    }
    const [imgData, setImgData] = useState(img().map((e)=>e));
    const [value, setValue] = useState(imgData.map((e)=>1))
    const [cart,setCart,isHighlighted,setIsHighlighted] = useOutletContext();
    

    function toSet(callback,i,val){
        callback(e=>{
            let hold =[...e];
            hold[i]=val;
            return hold
        })
    }

    function combineCart(val,data){
        setCart(prev=>{
            let hold = [...prev];
            hold.push({quantity:val, data:data});

            let temp = []
            hold.forEach(elem => {
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
            })

            console.log(temp);
            return temp
        });
    }

    useEffect(()=>{
        console.log(imgData.length);
        const getUrls = async ()=>{
            setImgData(await Promise.all(
                imgData.map((elem,index) => {
                    fetch(`https://fakestoreapi.com/products/${elem}`)
                        .then(response => response.json())
                        .then(data => {
                            toSet(setImgData,index,data);
                        })
                })
            ))
        }
        setIsHighlighted([0,1,0])
        getUrls();
    },[])

    useEffect(()=>{
        console.log('Cart')
        console.table(cart)
    },[cart])
    return(
        <div className={styles.container}>
            {
                imgData.map((e,i)=>{
                    return(
                        <div className={styles.card} key={i}>
                            {typeof e ==='object'?<img src={e.image} alt={e.description} className={styles.image}/>:<p>Loading...</p>}
                            {typeof e ==='object'?<p className={styles.parg}>{e.description}</p>:<p>Loading...</p>}
                            <div className={`${styles.quantity}`}>
                                <button className={`${styles.bubble} ${styles.red}`} onClick={()=>{
                                    if(+value[i]-1<=1){
                                        toSet(setValue,i,1)
                                    }
                                    else{
                                        toSet(setValue,i,+value[i]-1)
                                    }
                                    
                                }
                                }>-</button>
                                <input type="number" min='1' value={value[i]} onChange={(e)=> toSet(setValue,i,e.target.value)} className={`${styles.inp} ${styles.bubble}`}/>
                                <button className={`${styles.bubble} ${styles.green}`} onClick={()=>toSet(setValue,i,+value[i]+1)}>+</button>
                            </div>
                            <button className={styles.submit} onClick={()=>combineCart(value[i],e)}>Add to Cart</button>
                        </div>
                    )
                })
            }
        </div>
    )
}