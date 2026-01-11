import { useState } from 'react'
import { Outlet, useOutletContext } from "react-router-dom";
import './App.css'
import Checkout from './Checkout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Outlet />
      <div>
        <Checkout />
      </div>
    </div>
  )
}

export default App
