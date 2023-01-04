import Axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import "./PriceSet.css";
function PriceSet() {

    const [eMeterPriceDay, setEMeterPriceDay] = useState(0)
    const [eMeterPriceNight, setEMeterPriceNight] = useState(0)
    const [gMeterPrice, setGMeterPrice] = useState(0)

    let cred = localStorage.getItem("user");

    const submitMeterPrice = async () => {
        //Prevent page reload
        console.log("in submit");
        const meterReading = {
          eMeterPriceDay,
          eMeterPriceNight,
          gMeterPrice
        };
        await Axios.post(
          "http://localhost:8080/admin/setMeterPrice",
          meterReading,
          {
            headers: {
              Authorization: "Basic " + cred,
            },
          }
        )
          .then((response) => {
            console.log(response.data);
            console.log("submitted meter price successfully");
            window.location.reload(false);
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
      <Container >
        <Row className="outer">
          <Form style={{ width: "70%" }}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="number"
                size="lg"
                placeholder="Set the price per kWh for electricity day"
                onChange={(e) => {
                    setEMeterPriceDay(e.target.value);
                  }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="number"
                size="lg"
                placeholder="Set the price per kWh for electricity night"
                onChange={(e) => {
                    setEMeterPriceNight(e.target.value);
                  }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="number"
                size="lg"
                placeholder="Set the price per kWh for gas"
                onChange={(e) => {
                    setGMeterPrice(e.target.value);
                  }}
              />
            </Form.Group>

            <Button variant="primary" onClick={() => {
                          submitMeterPrice()
                        }}>
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default PriceSet;
