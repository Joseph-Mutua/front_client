import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    //redirect once count is equal to 00
    count === 0 && history.push("/");

    //Cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
      <div className="container p-5 text-center">
          <h3>
              Redirecting you in {count} seconds
          </h3>
      </div>
  )
};

export default LoadingToRedirect;