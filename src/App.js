import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./nav/Header";
import RegistrationCompletion from "./pages/auth/RegistrationCompletion";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  //Check firebase auth state
  useEffect(() => {
    const userUnsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "USER_LOGGED_IN",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    //Cleanup
    return () => userUnsubscribe();
  }, []);

  return (
    <>
      <div>
        <Header />
        <ToastContainer />
      </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/register/complete"
          component={RegistrationCompletion}
        />
      </Switch>
    </>
  );
};

export default App;
