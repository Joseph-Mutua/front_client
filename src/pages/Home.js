import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(5).then((res) => {
      setProducts(res.data);
      console.log(products);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="jumbotron">
        {loading ? (
          <h4 className="text-center text-primary">Loading...</h4>
        ) : (
          <h4 className="text-center">All Products</h4>
        )}
      </div>

      <div className="container">
        <div className="row">
          {products.map((product) => 
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
