import React, { useState } from "react";
import { firebaseAuth } from "../../firebase";
import { toast } from "react-toastify";


const Register = () => {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pageOnSubmit = {
      url: process.env.REACT_APP_REGISTRATION_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await firebaseAuth.sendSignInLinkToEmail(email, pageOnSubmit);
    toast.success(`Email is sent to ${email}. Click the link to complete your registration`)

    //Save user email in local storage
    window.localStorage.setItem("emailForConfirmation", email);

    //Clear State
    setEmail("");

  };

  const registrationForm = () => {
   return ( 
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1"></label>
            <input
              type="email"
              value={email}
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="exampleInputPassword1"></label>
            <input
              type="password"
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              Minimum Length: 8 characters
            </small>
          </div> */}
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
        </form>
      </>
   );
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center d-3">Register</h4>

          {registrationForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
