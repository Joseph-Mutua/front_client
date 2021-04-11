import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getSubCategories } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
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
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);


  //Redux
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      console.log("Single Product", p);
      setValues({ ...values, ...p.data });
    });
  };

  const loadCategories = () => {
    getCategories().then((c) =>  setCategories(c.data));
   
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    setValues({
      ...values,
      subcategories: [],
      [e.target.name]: e.target.value,
    });
    console.log("CLICKED CATEGORY", e.target.value);

    getSubCategories(e.target.value).then((res) => {
      console.log("SUBCATEGORIES ON CATEGORY CLICK", res.data);
      setSubOptions(res.data);
    });
    setShowSubs(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4 className="text-center">Update Product</h4>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            values={values}
            setValues={setValues}
            subOptions={subOptions}
            showSubs={showSubs}
            categories={categories}
          />

          {JSON.stringify(values)}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
