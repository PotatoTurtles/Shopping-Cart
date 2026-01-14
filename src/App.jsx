import { useState } from 'react'
import { Outlet, useOutletContext } from "react-router-dom";
import './App.css'
import Checkout from './Checkout';

function App() {
  const [cart,setCart] = useState([]);
  const [isHighlighted,setIsHighlighted] = useState([1,0,0]);

  return (
    <div >
      <Outlet context={[cart,setCart,isHighlighted,setIsHighlighted]}/>
      <div>
        <Checkout cart={cart} setCart={setCart} isHighlighted={isHighlighted} setIsHighlighted={setIsHighlighted}/>
      </div>
    </div>
  )
}

export default App
