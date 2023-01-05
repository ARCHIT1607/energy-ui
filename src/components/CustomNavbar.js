import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Axios from "axios";
import "./CustomNavbar.css"
import { useNavigate } from "react-router";

function CustomNavbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");

  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload(false);
  }

  const [balance, setBalance] = useState("")
  
  const getBalance = async () => {
    //Prevent page reload
    console.log("get Balance");
    await Axios.get("http://localhost:8080/customer/getBalance", {
      headers: {
        Authorization: "Basic " + user,
      },
    })
      .then((response) => {
        setBalance(response.data);
        console.log("balance inside success", balance);
      })
      .catch((error) => {
        if (error.response) {
          console.log("inside error");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    if(email!=="gse@shangrila.gov.un"){
      getBalance();
    }
  }, [])
  
  const [mySideBar, setMySideBar] = useState("0px");
  const [main, setMain] = useState("0px");

  const openNav = () => {
    setMySideBar("200px");
    setMain("200px");
  };

  const closeNav = () => {
    setMySideBar("0");
    setMain("0");
  };

  const logout = () =>{
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container id="navContainer">
          <Navbar.Brand href="#home">Energy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link id="navLink" href="/landing">Home</Nav.Link>
            <Nav.Link id="navLink" href="/cusBill">View/Pay</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          {user!=null?<p id="balance">Balance : {balance} &#163;</p>:""}
          </Navbar.Text>
          <Navbar.Text>
          {user!=null?<a href="#" id="logoutBtn" onClick={handleLogout}>Logout</a> : ""}
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>

      <div id="mySidebar" className="sidebar" style={{ width: mySideBar }}>
        <a href="#" className="closebtn" onClick={closeNav}>
          ×
        </a>
        <br></br>
        <br></br>
        <h2 style={{color:"white",fontSize:"1.2rem",textTransform:"uppercase"}}>{email}</h2>
        <a href="/landing">Home</a>
        <a href="/cusBill">Pay Bill</a>
        {user!=null?<p style={{color:"white"}} id="balance">Balance : {balance} &#163;</p>:""}
        <a href="#" onClick={logout}>Logout</a>
      </div>

      <div id="main" style={{ marginLeft: main }}>
        <button className="openbtn" type="button" onClick={openNav}>
          <h3 id="drawer">☰</h3>
        </button>
      </div>
    </>
  );
}

export default CustomNavbar;
