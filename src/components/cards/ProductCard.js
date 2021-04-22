import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/monitor.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;

  //Redux
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const [tooltip, setTooltip] = useState("Click to Add");

  const handleAddToCart = () => {
    //Create Cart Array
    let cart = [];
    if (typeof window !== "undefined") {
      //If cart is in local storage, get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      //Push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      //Remove Duplicate
      let unique = _.uniqWith(cart, _.isEqual);

      //Save to LocalStorage
      console.log("UNIQUE", unique);

      localStorage.setItem("cart", JSON.stringify(unique));

      //Show tooltip
      setTooltip("Added");

      //Add to Redux State
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      //Show Cart items inside drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No Rating Yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-primary" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to
              Cart
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
