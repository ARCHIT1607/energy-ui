import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Axios from "axios";

function CusBill() {
  const [meterReadings, setMeterReadings] = useState([]);
  const [price, setPrice] = useState([]);
  let cred = localStorage.getItem("user");

  const getUnPaidBill = async () => {
    console.log("get getBill");
    await Axios.get("http://localhost:8080/customer/getUnPaidBill", {
      headers: {
        Authorization: "Basic " + cred,
      },
    })
      .then((response) => {
        setMeterReadings(response.data);
        console.log("meter readings ", meterReadings);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const getMeterPrice = async () => {
    console.log("get getBill");
    await Axios.get("http://localhost:8080/customer/getMeterPrice", {
      headers: {
        Authorization: "Basic " + cred,
      },
    })
      .then((response) => {
        setPrice(response.data);
        console.log("prices ", price);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const payBill = async (id, amt) => {
    //Prevent page reload
    await Axios.post(
      "http://localhost:8080/customer/payBill?billId=" + id + "&amt=" + amt,
      null,
      {
        headers: {
          Authorization: "Basic " + cred,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        console.log("Bill Paid successfully");
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  useEffect(() => {
    getUnPaidBill();
    getMeterPrice();
  }, []);

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>period {meterReadings.billDate}</Accordion.Header>
          <Accordion.Body>
            <Table striped>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day Electricity Usage</th>
                  <th>Night Electricity Usage</th>
                  <th>Gas Usage</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {meterReadings &&
                  meterReadings.map((mReading) => {
                    return (
                      <tr>
                        <td id={mReading.id}>{mReading.billDate}</td>
                        <td>{mReading.eMeterReadingDay}</td>
                        <td>{mReading.eMeterReadingNight}</td>
                        <td>{mReading.gMeterReading}</td>
                        <td>{mReading.due}</td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              payBill(mReading.id,mReading.due);
                            }}
                          >
                            Pay
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default CusBill;
