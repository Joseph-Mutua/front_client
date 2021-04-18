import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubCategories } from "../../functions/subcategory";

const SubCategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getSubCategories().then((c) => {
      setSubcategories(c.data);
      setLoading(false);
    });
  }, []);

  const showSubCategories = () =>
    subcategories.map((c) => (
      <div
        key={c._id}
        className=" col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/subcategory/${c.slug}`}>{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showSubCategories()
        )}
      </div>
    </div>
  );
};

export default SubCategoryList;
