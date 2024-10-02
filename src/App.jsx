import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Details from './components/Details';
import Product from './components/Product';

function App() {
  const [count, setCount] = useState(0);

  return (
   <>
   {/* <Details /> */}
   <Product />
   </>
  );
}

export default App;
