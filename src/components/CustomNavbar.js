import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function CustomNavbar() {

  const email = localStorage.getItem("email");
  const balance = 0;
  useEffect(() => {
    getBalance
  }, [])
  
  const getBalance = async (e) => {
    //Prevent page reload
    console.log("get Balance");
    e.preventDefault();
    await Axios.post("http://localhost:8080/customer/getBalance?email=" + email)
      .then((response) => {
        balance = response.data;
        console.log(response.data);
        console.log("inside success");
        localStorage.setItem("email", email);
        console.log("email in login " + email);
        navigate({
          pathname: "/landing",
          search: createSearchParams({
            email: email,
          }).toString(),
        });
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
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Balance <a href="#login">{balance}</a>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
