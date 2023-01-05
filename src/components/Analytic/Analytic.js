import "./Analytic.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

function Analytic() {
  useEffect(() => {
    getAllMeterReadings();
  }, []);

  let cred = localStorage.getItem("user");

  const [meterReadings, setMeterReadings] = useState([]);

  const getAllMeterReadings = async () => {
    //Prevent page reload
    const labelSet = [];
    const dataSet1 = [];
    const dataSet2 = [];
    const dataSet3 = [];
    console.log("in get all meter readings");
    await Axios.get("http://localhost:8080/admin/meterReadings", {
      headers: {
        Authorization: "Basic " + cred,
      },
    })
      .then((response) => {
        console.log(response.data);
        const res = response.data;
        return res;
      })
      .then((res) => {
        console.log("ressss", res);
        for (const val of res) {
          dataSet1.push(val.eMeterReadingDay);
          dataSet2.push(val.eMeterReadingNight);
          dataSet3.push(val.gMeterReading);
          labelSet.push(val.submissionDate);
        }
        setData({
          labels: labelSet,
          datasets: [
            {
              label: "Electric reading day",
              data: dataSet1,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(99, 132, 0.5)",
            },
            {
              label: "Electric reading night",
              data: dataSet2,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 235, 0.5)",
            },
            {
              label: "Gas reading",
              data: dataSet3,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgb(255, 99, 132)",
            },
          ],
        });
        console.log("arrData", dataSet1, dataSet2);
      });
  };

  const [data, setData] = useState({
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(25, 90, 13, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  return (
    <div id="graph">
      <Container>
        <Row id="analyticRow">
          <Col lg={6}>
            <Bar id="bar1" data={data} options={options} />
          </Col>
          <Col lg={6}>
            <Bar id="bar2" data={data} options={options} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Analytic;
