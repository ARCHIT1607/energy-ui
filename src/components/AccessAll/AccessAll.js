import React, { useEffect, useState } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import "./AccessAll.css"
function AccessAll() {

  useEffect(() => {
    getAllMeterReadings()
  }, [])
  

  let cred = localStorage.getItem("user");

  const [meterReadings, setMeterReadings] = useState([]);

    const getAllMeterReadings = async () => {
        //Prevent page reload
        console.log("in get all meter readings");
        await Axios.get(
          "http://localhost:8080/admin/getAllMeterReading",
          {
            headers: {
              Authorization: "Basic " + cred,
            },
          }
        )
          .then((response) => {
            console.log(response.data);
            console.log("submitted meter price successfully");
            setMeterReadings(response.data);
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
      <Table responsive="sm" className="table">
        <thead>
          <tr>
            <th>Email Id</th>
            <th>Electric Meter Reading (D)</th>
            <th>Electric Meter Reading (N)</th>
            <th>Gas Meter Reading</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
        {meterReadings &&
                  meterReadings.map((mReading) => {
                    return (
                      <tr>
                        <td id={mReading.id}>{mReading.email}</td>
                        <td>{mReading.eMeterReadingDay}</td>
                        <td>{mReading.eMeterReadingNight}</td>
                        <td>{mReading.gMeterReading}</td>
                        <td>{mReading.submissionDate}</td>
                      </tr>
                    );
                  })}
        </tbody>
      </Table>
    </>
  );
}

export default AccessAll;
