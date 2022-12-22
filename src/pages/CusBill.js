import React from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function CusBill() {
  return (
    <>
    <Table striped>
      <thead>
        <tr>
          <th>Email Address</th>
          <th>Meter Reading (Electricity)</th>
          <th>Meter Reading (Gas)</th>
          <th>Action</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>test@gmail.com</td>
          <td>45</td>
          <td>25</td>
          <td><Button variant='primary'>Pay Bill</Button></td>
          <td>Unpaid</td>
        </tr>
        <tr>
          <td>test@gmail.com</td>
          <td>45</td>
          <td>25</td>
          <td><Button variant='primary'>Pay Bill</Button></td>
          <td>Unpaid</td>
        </tr>
        <tr>
          <td>test@gmail.com</td>
          <td>45</td>
          <td>25</td>
          <td><Button variant='primary' disabled>Pay Bill</Button></td>
          <td>paid</td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default CusBill