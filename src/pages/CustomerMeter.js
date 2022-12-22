import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomerMeter() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Submit Meter Reading
      </Button>

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

export default CustomerMeter;
