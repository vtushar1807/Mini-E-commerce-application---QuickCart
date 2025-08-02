import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';


import { useSelector } from 'react-redux';


export const NavBar = ()=>{

  const cartTotalItem = useSelector((store) => store.cartRed.cartItems)

    return(
        <Navbar expand="sm" className="bg-body-tertiary mt-0 p-0">
          <Container className='w-100' fluid="0">
            {/* This is given so that navbar be responsive across different screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />   
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navDiv" >
            <Nav.Link style={{textDecoration:"none", color:"white", fontSize:"22px",marginLeft:"90px", fontFamily:"Arial"}} as={Link} to="/">QuickCart</Nav.Link>
            <Nav.Link className="navLink" style={{textDecoration:"none", color:"grey"}} as={Link} to="/">Home</Nav.Link>
            <Nav.Link className='navLink' style={{textDecoration:"none",color:"grey" }} as={Link} to="/cart">Cart</Nav.Link>
            
            {/* <Nav.Link as={Link} to="/product-details/:id">Dynamic</Nav.Link> */}
            
            {

              // Checking that if items are there in cart, then only cart icons should show
             cartTotalItem.length>0 ? 
             <>

             <Nav.Link className='navLink dynamic-float' style={{textDecoration:"none",color:"grey" }} as={Link} to="/cart">🛒Cart</Nav.Link>
             <span className='dynamic-cart'>{cartTotalItem.length}</span>

             </> 
             : null
            }
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    )
}

