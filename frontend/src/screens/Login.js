import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credentials");
    }

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };

  const onChange = (event) => {
    setcredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
        <Link to="/Signup" className="m-3 btn btn-primary my-3">
          New user
        </Link>
      </form>
    </div>
  );
}
