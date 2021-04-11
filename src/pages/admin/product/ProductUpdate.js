import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getSubCategories } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

import { LoadingOutlined } from "@ant-design/icons";

const ProductUpdate = ({ match }) => {
  //Redux
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4 className="text-center">Update Product</h4>

          {JSON.stringify(match.params.slug)}
          
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
