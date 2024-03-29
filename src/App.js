import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import SideDrawer from "./components/drawer/SideDrawer";
import RegistrationCompletion from "./pages/auth/RegistrationCompletion";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCategoryCreate from "./pages/admin/subcategory/SubCategoryCreate";
import SubCategoryUpdate from "./pages/admin/subcategory/SubCategoryUpdate.";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubCategoryHome from "./pages/subcategory/SubCategoryHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage";
import Payment from "./pages/Payment";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

const App = () => {
  const dispatch = useDispatch();

  //Check firebase auth state
  useEffect(() => {
    const userUnsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
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
      }
    });

    //Cleanup
    return () => userUnsubscribe();
  }, [dispatch]);

  return (
    <>
      <div>
        <Header />
        <SideDrawer />
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
        <Route exact path="/forgot/password" component={ForgotPassword} />

        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />

        <AdminRoute
          exact
          path="/admin/subcategory"
          component={SubCategoryCreate}
        />
        <AdminRoute
          exact
          path="/admin/subcategory/:slug"
          component={SubCategoryUpdate}
        />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />

        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />

        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />

        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subcategory/:slug" component={SubCategoryHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </>
  );
};

export default App;
