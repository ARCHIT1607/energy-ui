import  Axios  from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./CustomerLogin.css";
import {Buffer} from 'buffer'

function CustomerLogin(props) {
  const navigate = useNavigate();

  let [authMode, setAuthMode] = useState("signin");
  const [customer, setCustomer] = useState([]);
  const [propertyType, setPropertyType] = useState(0);
  const [address, setAddress] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [evc, setEvc] = useState(0);

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  // React States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    //Prevent page reload
    console.log("in register");
    const customer = { email, password, propertyType, address, bedrooms };
    e.preventDefault();
    await Axios.post("http://localhost:8080/auth/register/"+evc, customer)
      .then((response) => {
        console.log(response.data);
        // let pwd = response.data.password;
        // console.log("response ",email,pwd)
        console.log("inside success");
        localStorage.setItem("user", Buffer.from(email+":"+password).toString('Base64'));
        console.log("email in login " + email);
        navigate("/landing");
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

  const handleLogin = async (e) => {
    //Prevent page reload
    console.log("in login");
    e.preventDefault();
    await Axios.post("http://localhost:8080/auth/login?email=" + email + "&password=" + password)
      .then((response) => {
        console.log(response.data);
        console.log("inside success");
        localStorage.setItem("email", email);
        console.log("email in login " + email);
        localStorage.setItem("user", Buffer.from(email+":"+password).toString('Base64'));
        navigate("/landing");
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
    if(localStorage.getItem("user")!=null){
      navigate('/landing')
    }
  }, [])
  

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Property type</label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option>Property Type</option>
              <option value="detached">detached</option>
              <option value="semi-detached">semi-detached</option>
              <option value="terraced">terraced</option>
              <option value="flat">flat</option>
              <option value="cottage">cottage</option>
              <option value="bungalow">bungalow</option>
              <option value="mansion">mansion</option>
            </Form.Select>
          </div>
          <div className="form-group mt-3">
            <label>Number of bedrooms</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="e.g 1"
              onChange={(e) => {
                setBedrooms(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Energy voucher code (EVC)</label>
            <input
              type="text"
              minlength={8}
              maxLength={8}
              className="form-control mt-1"
              placeholder="e.g 12345678"
              onChange={(e) => {
                setEvc(e.target.value);
              }}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default CustomerLogin;
