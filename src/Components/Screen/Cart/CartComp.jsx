import { NavBar } from "../../NavBar/NavBar"
import { Container,Row,Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"

import { removeItemFromCart } from "../../../ReduxStore/cartReducer"

export const CartComp = ()=>{

    const cartItems = useSelector((store) => store.cartRed.cartItems);
    const totalQuantity = useSelector((store) => store.cartRed.totalQuantity);      //fetching total items in cart currently
    const totalAmount = useSelector((store) => store.cartRed.totalAmount);          //fetching the total price of the items present in cart
    const navigate = useNavigate();
    const dispatch = useDispatch();



    return(
    
    <>
        <NavBar/>
{
    cartItems && cartItems.length>0 ?           //If items are available in cart only then individual divs will be created with product details
    
    <>
    <Container style={{height:"87vh"}} fluid="0" className="main-detail pt-2 ps-5">
    <Row className="w-100">

            <Col md="8">
            <h2 className="pb-3 pt-3">Shopping Cart</h2>
            
                <div style={{maxHeight:"70vh", overflowY:"auto", overflowX:"hidden"}}>
                {cartItems.map((items) => (
                    
                    <div className="bg-white cart-items mt-2" key={items.id}>

                    <div onClick={() => navigate(`/product/${items.id}`)}>
                        <img style={{height:"100px"}}  src={items.thumbnail} alt="" />
                    </div>

                    <div className="ms-5 p-2 w-100 me-5">
                        <span onClick={()=>navigate(`/product/${items.id}`)} className="fw-bold">{items.title}</span><br/>
                        <span onClick={()=>navigate(`/product/${items.id}`)} >{items.brand}</span> <span style={{float:"right"}}><img onClick={() => dispatch(removeItemFromCart(items))} height="21px" src="https://img.icons8.com/?size=100&id=64k1WPeHn58b&format=png&color=FA5252" alt="" /></span><br/>
                        <span onClick={()=>navigate(`/product/${items.id}`)} className="text-danger fw-bold">${items.price}</span>
                        <span onClick={()=>navigate(`/product/${items.id}`)} style={{fontSize:"10px", padding:"1px 6px 3px", borderRadius:"7px"}} className="bg-warning fw-bold">{items.discountPercentage}% OFF</span><br/>
                        <span onClick={()=>navigate(`/product/${items.id}`)} style={{fontSize:"10px"}} className="text-secondary">{items.availabilityStatus}</span>
                    </div>
                   
                    </div>
                    
                    
                ))}
                </div>
            
             </Col>

            <Col md="4">

            <div className="bg-white p-3 subtotal-cart">
                <span className="fw-bold">Subtotal </span>({totalQuantity} Items): <span className="text-success fw-bold">${totalAmount.toFixed(2)}</span>
                <div className="d-grid mt-3">
                <Button className="fw-bold" variant="warning">Proceed to Checkout</Button>
                </div>
            </div>
            
            </Col>


        </Row>
        </Container>
    
    </>
    
    : 

    // if there's no item in cart then this error page will appear
    <Container style={{fontFamily:"cursive", textShadow:"1px 1px black", backgroundColor: "rgba(168, 168, 168, 0.92)"}} fluid="0" className="text-center mt-0 p-3">            
    <Row style={{height:"250px"}} className="w-100">
        
            <span style={{marginTop:"100px"}}  className="fs-3 text-white">🛒 Cart is empty :(</span>
    </Row>
    </Container>
} 
    </>   
)}