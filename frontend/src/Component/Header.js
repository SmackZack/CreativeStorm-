import React from "react";
import { Navbar, Nav, Badge, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const wishlist = useSelector(state => state.wishlist)
  const { wishlistItems } = wishlist
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler =()=>{
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>

        <LinkContainer to="/"><Navbar.Brand>Pro Shop</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {
              userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                 <LinkContainer to="/profile">
                    <NavDropdown.Item><i className="fas fa-user"></i> Profile</NavDropdown.Item>
                 </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : <LinkContainer to="/login">
                  <Nav.Link><i className="fas fa-user"></i> Sign in</Nav.Link>
                </LinkContainer>
            }

            <LinkContainer to="/wishlist"><Nav.Link><i className="fas fa-bookmark"></i> Wishlist <sup>
              {wishlistItems.length>0 && <Badge pill variant="light">
                {wishlistItems.length}
              </Badge>}
            </sup>
            </Nav.Link></LinkContainer>
            <LinkContainer to="/cart"><Nav.Link><i className='fas fa-shopping-cart'></i> Cart <sup>
              {cartItems.length>0 && <Badge pill variant="light">
                {cartItems.length}
              </Badge>}
            </sup></Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    </header>
  );
};

export default Header;
