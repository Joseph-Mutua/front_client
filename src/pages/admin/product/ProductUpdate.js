import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
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

const ProductUpdate = ({ match, history }) => {
  //State
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);

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

      //Load single product
      setValues({ ...values, ...p.data });

      //Load product subcategories
      getSubCategories(p.data.category._id).then((res) => {
        //On first load show default subcategories
        setSubOptions(res.data);
      });

      //Prepare array of subcategory ids to show as default values in subcategory select
      let arr = [];
      p.data.subcategories.map((s) => {
        arr.push(s._id);
      });

      //Required for ant design select to work
      setArrayOfSubIds((prev) => arr);
    });
  };

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
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
    setLoading(true);

    values.subcategories = arrayOfSubIds;
    // values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.succcess(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
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
          {loading ? (
            <LoadingOutlined className="text-primary" />
          ) : (
            <h4 className="text-center">Update Product</h4>
          )}

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            values={values}
            setValues={setValues}
            subOptions={subOptions}
            showSubs={showSubs}
            categories={categories}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
          />

          {JSON.stringify(values)}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
