import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Details from './components/Details';
import Product from './components/Product';
import ProductForm from './components/ProductForm';
import NotificationForm from './components/NotificationForm';
import NotificationFlowbite from './components/NotificationFlowbite';

function App() {
  const [count, setCount] = useState(0);

  return (
   <>
   {/* <Details /> */}
   {/* <Product /> */}
   {/* <ProductForm /> */}
   <div >
   {/* <NotificationForm /> */}
   <NotificationFlowbite />
   </div>
 
   </>
  );
}

export default App;
