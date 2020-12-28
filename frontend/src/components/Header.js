import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { bubble as Menu } from "react-burger-menu";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const styles = {
    bmBurgerButton: {
      position: "absolute",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#bdc3c7",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#373a47",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <header>
      <Menu styles={styles}>
        {userInfo ? (
          <div>
            <Link to="/profile">
              <div>Profile</div>
            </Link>
            <Link to="/dashboard/historylist">
              <div>Histories</div>
            </Link>
            <div onClick={logoutHandler}>Logout</div>
          </div>
        ) : (
          <Link to="/login">
            <div>
              <i className="fas fa-user"></i> Sign In
            </div>
          </Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div>
            <hr />
            <div>ADMIN</div>
            <Link to="/admin/userlist">
              <div>Users</div>
            </Link>
            <Link to="/admin/orderlist">
              <div>Orders</div>
            </Link>
          </div>
        )}
      </Menu>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>Devoleum</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <Link to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
