import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Axios from "axios";


function CustomNavbar() {

  const user = localStorage.getItem("user");

  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload(false);
  }

  // useEffect(() => {
  //   user = localStorage.getItem("user")
  //   console.log("checck user",user)
  // }, [user])
  

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Energy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/landing">Home</Nav.Link>
            <Nav.Link href="#hightlights">Highlight</Nav.Link>
            <Nav.Link href="/cusBill">View/Pay</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {user!=null?<a href="#" onClick={handleLogout}>Logout</a> : ""}
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
