import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch,} from "react-redux";
import { createOrUpdateUser } from '../../functions/auth';


const RegistrationCompletion = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch() 
 

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForConfirmation"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }

    if (password.length < 6) {
      toast.error("EPassword should atleast be 6 characters");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem("emailForConfirmation");

        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        //redux store
        console.log("user", user, "idTokenResult", idTokenResult);

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
        //redirect
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
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
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <small id="emailHelp" className="form-text text-muted">
              Minimum Length: 6 characters
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
