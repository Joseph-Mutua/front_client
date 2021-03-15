import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { createOrUpdateUser } from "../../helpers/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  let dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      console.log(result);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log(res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      history.push("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {

        console.log(user);

        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log(res);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
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
          <div className="text-center d-3">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4>Login </h4>
            )}
          </div>
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
