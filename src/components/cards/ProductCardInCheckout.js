import React from "react";
import ModalImage from "react-modal-image";
import Monitor from "../../images/monitor.png";
import { useDispatch } from "react-redux";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      console.log("CART UPDATE COLOR", cart);

      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={Monitor} large={Monitor} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            className="form-control"
            name="color"
            id={p._id}
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td>{p.count} </td>
        <td>Shipping</td>
        <td>Delete Icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
