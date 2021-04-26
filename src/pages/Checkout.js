import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, emptyCart, saveUserAddress } from "../functions/user";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState("");
  const [coupon, setCoupon] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("USER CART RES", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          console.log("ADRESS SAVED");
          toast.success("Address Saved!");
        }
      })
      .catch((err) => {
        console.log("ERROR SAVING ADRESS", err);
      });
  };

  const handleEmptyCart = () => {
    //Remove from Local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    //Remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    //Remove from backend
    emptyCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue Shopping");
    });
  };

  const applyDiscountCoupon = () => {
    console.log("SEND COUPON TO BACKEND", coupon);
  };

  const showAddress = () => (
    <>
      {" "}
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>{" "}
    </>
  );

  const showProductSummary = () => (
    <p>
      {products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) x {p.count} ={" "}
            {p.product.price * p.count}
          </p>
        </div>
      ))}
    </p>
  );

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => setCoupon(e.target.value)}
        value={coupon}
        type="text"
        className="form-control"
      />

      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />

        <hr />

        {showProductSummary()}

        <p>Cart Total : ${total}</p>

        <div className="row">
          <div className="col-md-3"></div>
          <button
            className="btn btn-primary"
            disabled={!addressSaved || !products.length}
          >
            Place Order
          </button>

          <div className="col-md-3"></div>
          <button
            disabled={!products.length}
            onClick={handleEmptyCart}
            className="btn btn-primary text-danger"
          >
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
