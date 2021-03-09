import React, { useState, useEffect } from "react";
import { firebaseAuth } from "../../firebase";
import { toast } from "react-toastify";

const RegistrationCompletion = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useState(() => {
    setEmail(window.localStorage.getItem("emailForConfirmation"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  };

  const completeRegistrationForm = () => {
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
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1"></label>
            <input
              type="password"
              value={password}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <small id="emailHelp" className="form-text text-muted">
              Minimum Length: 8 characters
            </small>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            SUBMIT
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center d-3">COMPLETE REGISTRATION</h4>

          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegistrationCompletion;
