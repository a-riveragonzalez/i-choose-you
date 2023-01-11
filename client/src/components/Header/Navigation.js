import React from "react";
import { useLocation } from "react-router-dom";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Auth from "../../utils/auth";

const Navigation = () => {
  const pathName = useLocation().pathname;
  return (
    <Navbar bg="light" variant="light" className="mt-4 ">
      <Container>
        <Nav className="me-auto p-1">
          {Auth.loggedIn() ? (
            <>
              <Nav.Link
                href="/profile"
                className={
                  pathName === "/profile" ? "nav-link active" : "nav-link"
                }
              >
                Profile
              </Nav.Link>
              <Nav.Link
                href="/battles"
                className={
                  pathName === "/battles"
                    ? "nav-link active ml-5"
                    : "nav-link ml-5"
                }
              >
                Battles
              </Nav.Link>

              <Nav.Link
                href="#"
                onClick={() => Auth.logout()}
                className="nav-link ml-5 login-out"
              >
                Logout{" "}
              </Nav.Link>
            </>
          ) : (
            <Nav.Link
              href="/login"
              className={
                pathName === "/login"
                  ? "nav-link ml-5 active login-out"
                  : "nav-link ml-5 login-out"
              }
            >
              Login{" "}
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
