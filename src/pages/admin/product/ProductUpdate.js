import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getSubCategories } from "../../../functions/category";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  //State
  const [values, setValues] = useState(initialState);

  //Redux
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("Single Product", p);
      setValues({ ...values, ...p.data });
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4 className="text-center">Update Product</h4>

          {JSON.stringify(slug)}
          {JSON.stringify(values)}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
