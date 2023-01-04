import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import About from "../components/About";
import Axios from "axios";
import { Buffer } from "buffer";
import { useRef } from "react";
import QrScanner from "qr-scanner";
// import QrScan from 'qr-scanner'
import CustomNavbar from "../components/CustomNavbar";

function Landing() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const [meterShow, setMeterShow] = useState(false);

  const handleMeterClose = () => setMeterShow(false);
  const handleMeterShow = () => setMeterShow(true);
  let isCustomer = localStorage.getItem("email") !== "gse@shangrila.gov.un";

  const [submissionDate, setSubmissionDate] = useState("");
  const [eMeterReadingDay, setEMeterReadingDay] = useState(0);
  const [eMeterReadingNight, setEMeterReadingNight] = useState(0);
  const [gMeterReading, setGMeterReading] = useState(0);

  const [evc, setEVC] = useState("");
  let balance = 0;
  let cred = localStorage.getItem("user");
  const routeBill = () => {
    navigate({
      pathname: "/cusBill",
    });
  };

  const handleSubmitMeterReading = async (e) => {
    //Prevent page reload
    console.log("in submit");
    const meterReading = {
      submissionDate,
      eMeterReadingDay,
      eMeterReadingNight,
      gMeterReading,
    };
    e.preventDefault();
    // deleted later in code clean up
    // let x = Buffer.from('test1@gmail.com:test').toString('Base64')
    // console.log("test1@gmail.com "+ Buffer.from('test1@gmail.com:test').toString('Base64'))
    // console.log("test1@gmail.com "+ Buffer.from(x,'Base64').toString())
    // console.log("test6@gmail.com "+ Buffer.from('test6@gmail.com:test').toString('Base64'))
    await Axios.post(
      "http://localhost:8080/customer/submitMeterReading",
      meterReading,
      {
        headers: {
          Authorization: "Basic " + cred,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        console.log("submitted meter reading successfully");
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

  const handleTopUp = async () => {
    //Prevent page reload
    await Axios.post("http://localhost:8080/customer/topUp?EVC=" + evc, null, {
      headers: {
        Authorization: "Basic " + cred,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("Top up successfully");
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

  const getBalance = async () => {
    //Prevent page reload
    console.log("get Balance");
    await Axios.get("http://localhost:8080/customer/getBalance", {
      headers: {
        Authorization: "Basic " + cred,
      },
    })
      .then((response) => {
        balance = response.data;
        console.log("balance inside success", balance);
        window.balance = balance;
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
    if (localStorage.getItem("user") == null) {
      navigate("/");
    }

    console.log("isCustomer ", isCustomer);
    if (!isCustomer) {
      navigate("/adminDashboard");
    }
  }, []);

  const BillPage = () => {
    navigate("/cusBill");
  };

  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const [data, setData] = useState(null);

  const handleClick = () => {
    fileRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const result = await QrScanner.scanImage(file);
    setEVC(result);
  };

  return (
    <>
      <CustomNavbar></CustomNavbar>
      <div id="outer-section">
        <div id="coupon">
          <h4>
            Information on the &#163; 200 Energy Bills Suport Scheme payment
          </h4>
        </div>
        <div id="jumbotron">
          <h3>Energy help and advice</h3>
          <h1>Ways to save energy over winter</h1>
        </div>
        <div id="feature">
          <h2 style={{ textAlign: "center" }}>Features</h2>
          <div className="container" id="features">
            <div className="row" id="cusFeature">
              <div className="col-lg-4" id="cusFeatureCol">
                <Card id="card" >
                  <Card.Body>
                    <Card.Title>
                      <h2>Submit new meter reading</h2>
                    </Card.Title>
                    <Card.Text>
                      <p id="meterReadingCard">
                        Electricity meter reading - Day <br></br>Electricity
                        meter reading - Night <br></br>Gas meter reading
                      </p>
                      <Button variant="primary" onClick={handleMeterShow}>
                        Submit Meter Reading
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-4" id="cusFeatureCol">
                <Card id="card">
                  <Card.Body>
                    <Card.Title>
                      <h2>View & Pay latest unpaid bill</h2>
                    </Card.Title>
                    <Card.Text>
                      <p>
                        A customer can view and pay the latest unpaid bill with
                        energy credit*.
                      </p>
                      <Button variant="primary" onClick={BillPage}>
                        View/Pay Bill
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-lg-4" id="cusFeatureCol">
                <Card id="card">
                  <Card.Body>
                    <Card.Title>
                      <h2>Top Up</h2>
                    </Card.Title>
                    <Card.Text>
                      <p>A customer can top up the credit with a valid EVC*.</p>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            minLength={8}
                            maxLength={8}
                            placeholder="Enter valid EVC"
                            value={evc}
                            onChange={(e) => {
                              setEVC(e.target.value);
                            }}
                          />
                          <br />
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleTopUp();
                            }}
                            style={{ marginRight: "1rem" }}
                          >
                            credit
                          </Button>
                          <Button variant="primary" onClick={handleClick}>
                            Upload Qr Code
                          </Button>
                          <input
                            type="file"
                            ref={fileRef}
                            onChange={handleChange}
                            accept=".png, .jpg, .jpeg"
                            style={{ display: "none" }}
                          />
                        </Form.Group>
                      </Form>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={meterShow}
        onHide={handleMeterClose}
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
              <Form.Control
                type="date"
                placeholder="Enter Submission date"
                onChange={(e) => {
                  setSubmissionDate(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                Submission date (e.g. 2022-11-05, default value: today)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Electricity meter reading - Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="kWh"
                onChange={(e) => {
                  setEMeterReadingDay(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                Electricity meter reading - Day (e.g. 100 kWh)
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Electricity meter reading - Night</Form.Label>
              <Form.Control
                type="number"
                placeholder="kWh"
                onChange={(e) => {
                  setEMeterReadingNight(e.target.value);
                }}
              />
              <Form.Text className="text-muted">Gas meter reading</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Gas meter reading (e.g. 800 kWh 1 )</Form.Label>
              <Form.Control
                type="number"
                placeholder="kWh"
                onChange={(e) => {
                  setGMeterReading(e.target.value);
                }}
              />
              <Form.Text className="text-muted">(e.g. 800 kWh)</Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmitMeterReading}
            >
              Submit Reading
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Landing;
