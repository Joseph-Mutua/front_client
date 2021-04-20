import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Monitor from "../../images/monitor.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState("Click to Add");

  //Redux
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

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
    }
  };
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Monitor} className="mb-3 card-image" />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>

          <TabPane tab="More" key="2">
            Call us on xxx xxx xxx to learn more this about Product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No Rating Yet</div>
        )}
        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                  Cart
                </a>
              </Tooltip>
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br />
              Add to Wishlist
            </Link>,

            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;