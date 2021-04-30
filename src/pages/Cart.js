import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price;
    }, 0);
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Images</th>
          <th scope="col">Titles</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  const saveOrderToDb = () => {
    // console.log("cart", cart)
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RESPONSE", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => {
        console.log("CART SAVE ERR", err);
      });
  };

    const saveCashOrderToDb = () => {
      // console.log("cart", cart)

   dispatch({
     type: "COD",
     payload: true
   })
      
      userCart(cart, user.token)
        .then((res) => {
          console.log("CART POST RESPONSE", res);
          if (res.data.ok) history.push("/checkout");
        })
        .catch((err) => {
          console.log("CART SAVE ERR", err);
        });
    };


  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Cart / {cart.length} Products</h4>
          {!cart.length ? (
            <p>
              No Products in Cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>

        <div className="col-md-4">
          <h4>Order Surmary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                disabled={!cart.length}
                className="btn btn-sm btn-warning mt-2"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={saveCashOrderToDb}
                disabled={!cart.length}
                className="btn btn-sm btn-primary mt-2"
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link to={{ pathname: "/login", state: { from: "cart" } }}>
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
