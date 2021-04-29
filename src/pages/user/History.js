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
    loadUserOrders()
  }, [])

  const loadOrders = () => getUserOrders(user.token).then((res) => {
    console.log(JSON.stringify(res.data, null, 4));
    setOrders(res.data)
  })

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">User Page</div>
      </div>
    </div>
  );
};

export default History;
