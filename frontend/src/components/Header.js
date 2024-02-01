import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandeler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">AltShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandeler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  {" "}
                  <Nav.Link href="/login">
                    <i className="fas fa-user"></i> Sign-in
                  </Nav.Link>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-menu">
                  <NavDropdown.Item href="/admin/userList">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/productList">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/orderList">
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
