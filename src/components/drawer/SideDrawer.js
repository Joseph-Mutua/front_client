import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Monitor from "../../images/monitor.png";

const imageStyle = {
  width: "100%",
  height: "50px",
  objectFit: "cover",
};

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));

  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Products`}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images[0] ? (
              <>
                <img src={p.images[0].url} style={imageStyle} />
                <p className="text-center">
                  {p.title} x {p.count}
                </p>
              </>
            ) : (
              <>
                <img src={Monitor} style={imageStyle} />
                <p className="text-center">
                  {p.title} x {p.count}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to={`/cart`}>
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="text-center btn btn-primary btn-raised btn-block"
        >Go To Cart</button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
