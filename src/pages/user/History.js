import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const History = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => <p>Each Order and its products</p>;

  const showEachOrder = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <p>Show Payment Info</p>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>PDF Download</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"}
          </h4>

          {showEachOrder()}
        </div>
      </div>
    </div>
  );
};

export default History;
