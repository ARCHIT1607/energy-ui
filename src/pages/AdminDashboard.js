import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Outlet, useNavigate } from "react-router";
import "./AdminDashboard.css";
import "react-circular-progressbar/dist/styles.css";
import Axios from "axios";

function AdminDashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const goPriceSet = () => {
    navigate("priceSet");
  };

  const goAccessAll = () => {
    navigate("accessAll");
  };

  const goAnalytic = () => {
    navigate("analytic");
  };

  const [userCount, setUserCount] = useState(0);
  const [meterReadingCount, setMeterReadingCount] = useState(0);
  let cred = localStorage.getItem("user");

  const getUserCount = async () => {
    await Axios.get("http://localhost:8080/admin/getUserCount", {
      headers: {
        Authorization: "Basic " + cred,
      },
    }).then((response) => {
      console.log(response.data);
      console.log("submitted meter price successfully");
      setUserCount(response.data);
    });
  };

  const getMeterReadingCount = async () => {
    await Axios.get("http://localhost:8080/admin/getMeterReadingCount", {
      headers: {
        Authorization: "Basic " + cred,
      },
    }).then((response) => {
      console.log(response.data);
      console.log("submitted meter price successfully");
      setMeterReadingCount(response.data);
    });
  };

  const logout = () =>{
    localStorage.clear();
    navigate("/");
  }

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

  useEffect(() => {
    getUserCount();
    getMeterReadingCount();
  }, []);
  return (
    <>
      <div id="mySidebar" className="sidebar" style={{ width: mySideBar }}>
        <a href="#" className="closebtn" onClick={closeNav}>
          ×
        </a>
        <br></br>
        <br></br>
        <h1 style={{color:"white"}}>Dashboard</h1>
        <a href="#" onClick={goPriceSet}>Meter Price</a>
        <a href="#" onClick={goAccessAll}>Access All Meter Readings</a>
        <a href="#" onClick={goAnalytic}>Graph</a>
        <a href="#" onClick={logout}>Logout</a>
      </div>

      <div id="adminMain" style={{ marginLeft: main }}>
        <button className="openbtn" type="button" onClick={openNav}>
          <h3>☰</h3>
        </button>
      </div>

      <div className="container-fluid" style={{ padding: "1rem" }}>
        <h1 id="adminText">Admin Dashboard</h1>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          id="nav"
        >
          <Card
            style={{ width: "9rem", backgroundColor: "black" }}
            className="card"
          >
            <Card.Body>
              <Card.Title style={{ color: "white" }}>Users</Card.Title>
              <Card.Text>
                <h3 style={{ color: "white" }}>{userCount}</h3>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            border="primary"
            style={{ width: "15rem", margin: "1rem" }}
            bg="primary"
            text="white"
          >
            <Card.Body>
              <Card.Title>Meter Price</Card.Title>
              <Card.Text>Card to set current Meter Price</Card.Text>
              <Button variant="success" onClick={goPriceSet}>
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <br />
          <Card
            border="primary"
            style={{ width: "15rem", margin: "1rem" }}
            bg="secondary"
            text="white"
          >
            <Card.Body>
              <Card.Title>Access All Meter Submitted</Card.Title>
              <Card.Text>Card to view all customer meter readings</Card.Text>
              <Button variant="success" onClick={goAccessAll}>
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <br />
          <Card
            border="primary"
            style={{ width: "15rem", margin: "1rem" }}
            bg="success"
            text="white"
          >
            <Card.Body>
              <Card.Title>Graph</Card.Title>
              <Card.Text>Card to analyse data</Card.Text>
              <Button variant="danger" onClick={goAnalytic}>
                Go somewhere
              </Button>
            </Card.Body>
          </Card>
          <br />
          <Card style={{ width: "9rem", backgroundColor: "black" }}>
            <Card.Body>
              <Card.Title style={{ color: "white" }}>Meter Readings</Card.Title>
              <Card.Text>
                <h3 style={{ color: "white" }}>{meterReadingCount}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>

        <Row id="outlet">
          <Outlet></Outlet>
        </Row>
      </div>
    </>
  );
}

export default AdminDashboard;
