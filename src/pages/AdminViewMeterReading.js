import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { Table } from 'react-bootstrap';

function AdminViewMeterReading() {

    const [cusMeterReadings, setCusMeterReadings] = useState([])
    let cred = localStorage.getItem("user");

    const getAllMeterReading = async () => {
        console.log("getAllMeterReading");
        await Axios.get("http://localhost:8080/admin/getAllMeterReading", {
          headers: {
            Authorization: "Basic " + cred,
          },
        })
          .then((response) => {
            setCusMeterReadings(response.data);
            console.log("meter readings ", cusMeterReadings);
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
        getAllMeterReading()
      }, [])
      

  return (
    <>
    <Table striped>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day Electricity Usage</th>
                  <th>Night Electricity Usage</th>
                  <th>Gas Usage</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                {cusMeterReadings &&
                  cusMeterReadings.map((mReading) => {
                    return (
                      <tr>
                        <td id={mReading.id}>{mReading.submissionDate}</td>
                        <td>{mReading.eMeterReadingDay}</td>
                        <td>{mReading.eMeterReadingNight}</td>
                        <td>{mReading.gMeterReading}</td>
                        <td>{mReading.email}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
    </>
  )
}

export default AdminViewMeterReading