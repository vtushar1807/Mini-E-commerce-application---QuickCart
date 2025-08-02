import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from "react-router"

import { Home } from "./Components/Screen/Home/Home"
// import { CardComp } from "./Components/Card/CardComp"
import { CartComp } from "./Components/Screen/Cart/CartComp"
import { ProductDetail } from './Components/Screen/ProductDetail/ProductDetail';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<CartComp/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />

      </Routes>
    </>
  )
}

export default App
