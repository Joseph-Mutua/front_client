import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";

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

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  //Redux
  const { user } = useSelector((state) => ({ ...state }));

  //Destructure values
  const {
    title,
    description,
    price,
    categories,
    category,
    subcategories,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success("Product Created!");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    console.log(e.target.name, "---->", e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Create Product</h4>
          <hr />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option value="No">Please Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <select
                type="text"
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option value="No">Please Select</option>
                {colors.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Brand</label>
              <select
                type="text"
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option value="No">Please Select</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
