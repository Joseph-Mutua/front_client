import React, { useEffect, useState } from "react";
import { getSubCategory } from "../../functions/subcategory";
import ProductCard from "../../components/cards/ProductCard";

const SubCategoryHome = ({ match }) => {
  const [subcategory, setSubcategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSubCategory(slug).then((c) => {
      console.log(c.data);

      setSubcategory(c.data.subcategory);
      setProducts(c.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 my-5 display-4 jumbotron">
              {products.length} Products in {subcategory.name}
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryHome;
