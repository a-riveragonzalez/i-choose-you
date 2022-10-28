import React from "react";
import { useLocation } from "react-router-dom";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
    const pathName = useLocation().pathname;
   return (<Navbar bg="light" variant="light" className="mt-4 ">
          <Container>
            <Nav className="me-auto p-1">
              <Nav.Link
                href="/"
                // onClick={() => {
                //   handlePageChange("Home");
                // }}
                className={pathName === "/" ? 'nav-link active' : 'nav-link'}
              >
                Home
              </Nav.Link>
              {/* todo :  */}
              <Nav.Link
                href="/battles"
                // onClick={() => {
                //   handlePageChange("Battles");
                // }}
                className={pathName === "/battles" ? 'nav-link active ml-5' : 'nav-link ml-5'}
              >
                Battles
              </Nav.Link>
              <Nav.Link
                href="/login"
                // onClick={() => {
                //   handlePageChange("Login");
                // }}
                className={pathName === "/login" ? 'nav-link ml-5 active' : 'nav-link ml-5'}
              >
                Login/Logout
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>)
}

export default Navigation;