import { Divider } from "antd";
import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password update");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          className="form-control"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <small>Minimum Length: 6 Characters</small>
      </div>
      <div>
        <button
          className="tn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-primary text-center">Loading...</h4>
          ) : (
            <h4 className="text-center p-5">Update Password</h4>
          )}

          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
