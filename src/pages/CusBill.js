import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Axios from "axios"

function CusBill() {

  const [meterReadings, setMeterReadings] = useState([])
  let cred = localStorage.getItem("user")

  const getUnPaidBill = async () => {
    console.log("get getBill");
    await Axios.get("http://localhost:8080/customer/getUnPaidBill", {
      headers: {
        Authorization: "Basic " + cred,
      },
    })
      .then((response) => {
        setMeterReadings(response.data)
        console.log("meter readings ",meterReadings);
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

  const payBill = async (id) => {
    //Prevent page reload
    await Axios.post("http://localhost:8080/customer/payBill?billId=" + id, null, {
      headers: {
        Authorization: "Basic " + cred,
      },
    })
      .then((response) => {
        console.log(response.data);
        console.log("Bill Paid successfully");
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

  useEffect(() => {
    getUnPaidBill()
  }, [])
  
  return (
    <>

<Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header >period 2022-11-20 to 2022-12-20</Accordion.Header>
        <Accordion.Body>
        <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Day Electricity Usage</th>
          <th>Night Electricity Usage</th>
          <th>Gas Usage</th>
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
                  <td><Button variant="primary" onClick={()=>{payBill(mReading.id)}}>
                      Pay
                    </Button></td>
                </tr>
              );
            })}
      </tbody>
    </Table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  )
}

export default CusBill