import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function CustomNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Energy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="landing">Home</Nav.Link>
            <Nav.Link href="#hightlights">Highlight</Nav.Link>
            <Nav.Link href="cusBill">View/Pay</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
