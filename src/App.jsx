import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Details from './components/Details';
import Product from './components/Product';
import ProductForm from './components/ProductForm';
import NotificationForm from './components/NotificationForm';

function App() {
  const [count, setCount] = useState(0);

  return (
   <>
   {/* <Details /> */}
   {/* <Product /> */}
   {/* <ProductForm /> */}
   <div className='bg-slate-200'>
   <NotificationForm />
   </div>
 
   </>
  );
}

export default App;
