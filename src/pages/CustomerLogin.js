import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

function CustomerLogin(props) {
  const navigate = useNavigate();

  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  // React States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    //Prevent page reload
    console.log("in submit")
    e.preventDefault();
    navigate({
      pathname:"/landing",
      search:createSearchParams({
        email:email
      }).toString()
    });
      // await Axios.post(
      //   window.API_URL + "/login?userName=" + username + "&password=" + password
      // )
      //   .then((response) => {
      //     console.log(response.data);
      //     console.log("inside success")
      //     localStorage.setItem("email", email);
      //     console.log("email in login " + email);
      //   })
      //   .catch((error) => {
      //     if (error.response) {
      //       console.log("inside error")
      //       console.log(error.response.data);
      //       console.log(error.response.status);
      //       console.log(error.response.headers);
      //       // alert(error.response.data);
      //       toast(error.response.data);
      //     } else {
      //       console.log("Error", error.message);
      //     }
      //   });

  };

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
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
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
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Property type</label>
            <Form.Select aria-label="Default select example">
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
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
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

export default CustomerLogin;
