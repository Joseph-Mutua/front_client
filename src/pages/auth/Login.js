import React, { useState } from "react";
import { Button } from "antd";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { MailOutlined } from "@ant-design/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table(email, password);
  };

  const loginForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1"></label>
            <input
              type="email"
              value={email}
              className="form-control"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1"></label>
            <input
              type="password"
              value={password}
              className="form-control"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />
          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            block
            shape="round"
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 6}
          >
            Login wih Email/Password
          </Button>
        </form>
      </>
    );
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="text-center d-3">Login</h4>

          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
