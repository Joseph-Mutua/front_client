import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { deleteProduct } from "../../../functions/product";
import {useSelector} from "react-redux";
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleDelete = (slug) => {
    let answer = window.confirm(`Are you sure you want to delete ${slug} ?`);
    if (answer) {
      console.log("Send delete request", slug);
      deleteProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`)
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-primary text-center">Loading...</h4>
          ) : (
            <h4 className="text-center">All Products</h4>
          )}
          <div className="row">
            {" "}
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                {" "}
                <AdminProductCard
                  product={product}
                  handleDelete={handleDelete}
                />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
