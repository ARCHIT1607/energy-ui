
import React, { useState } from "react";
import "./Landing.css";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import About from "../components/About";
function Landing() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let isCustomer = searchParam.get("email")!=="gse@shangrila.gov.un";

  const routeBill = ()=>{
    navigate({
      pathname:"/cusBill"
    });
  }
  return (
    <>
      <div>
        <div id="coupon">
          <h4>
            Information on the &#163; 250 Energy Bills Suport Scheme payment
          </h4>
        </div>
        <div id="jumbotron">
          <h3>Energy help and advice</h3>
          <h1>Ways to save energy over winter</h1>
        </div>
        <div id="feature">
          <h2>Features</h2>
          {isCustomer === true ? (
            <div id="customer-highlights">
              <div className="container" id="features">
                <div className="row" id="cusFeature">
                  <div className="col-lg-4">
                    <h3 id="hightlight-title">Submit new meter reading</h3>
                    <p>Electricity meter reading - Day</p>
                    <p>Electricity meter reading - Night</p>
                    <p>Gas meter reading</p>
                    <Button variant="primary" onClick={handleShow}>
                      Submit Meter Reading
                    </Button>
                  </div>
                  <div className="col-lg-4">
                    <h3 id="hightlight-title">View & Pay latest unpaid bill</h3>
                    <p>
                      A customer can view and pay the latest unpaid bill with
                      energy credit*.
                    </p>
                    <Button variant="primary" onClick={routeBill}>
                      View/Pay Bill
                    </Button>
                  </div>
                  <div className="col-lg-4">
                    <h3 id="hightlight-title">Top up</h3>
                    <p>A customer can top up the credit with a valid EVC*.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div id="admin-highlights">
              <div className="container" id="features">
                <div className="row" id="adminFeature">
                  <div className="col-lg-4">
                    <h4 id="hightlight-title">
                      Set price kWh for electricity & gas
                    </h4>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Electricity</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter price in kWh"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Gas</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter price in kWh"
                        />
                      </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleShow}>
                      Submit Price
                    </Button>
                  </div>
                  <div className="col-lg-4">
                    <h3 id="hightlight-title">Access meter reading</h3>
                    <Button variant="primary" onClick={handleShow}>
                      Access Reading
                    </Button>
                  </div>
                  <div className="col-lg-4">
                    <h3 id="hightlight-title">Admin Dashboard</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <About></About>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Meter Reading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Submission Date</Form.Label>
              <Form.Control type="date" placeholder="Enter Submission date" />
              <Form.Text className="text-muted">
                Submission date (e.g. 2022-11-05, default value: today)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Electricity meter reading - Day</Form.Label>
              <Form.Control type="number" placeholder="kWh" />
              <Form.Text className="text-muted">
                Electricity meter reading - Day (e.g. 100 kWh)
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Electricity meter reading - Night</Form.Label>
              <Form.Control type="number" placeholder="kWh" />
              <Form.Text className="text-muted">Gas meter reading</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Gas meter reading (e.g. 800 kWh 1 )</Form.Label>
              <Form.Control type="number" placeholder="kWh" />
              <Form.Text className="text-muted">(e.g. 800 kWh)</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Reading
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Landing;
