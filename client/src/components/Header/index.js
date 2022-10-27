import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <header className="mb-4 py-3 align-center">
      <div className="justify-space-between-lg justify-center align-center">
        <Link className="page-title" to="/">
          <h1 className="">i choose you!</h1>
        </Link>
      </div>
      {/* nav -- Home, Battles, Login/Logout */}
      <>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* todo :  */}
            <Nav.Link href="/battles">Battles</Nav.Link>
            <Nav.Link href="/login">Login/Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    </header>
  );
};

export default Header;
