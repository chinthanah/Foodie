import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-bold" to="/">
            Foodies
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 my-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div>
                <div
                  className="btn bg-dark text-white mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
                <div className="btn bg-dark text-white mx-2">My Cart</div>
              </div>
            ) : (
              <div className="d-flex btn bg-dark text-white mx-2 mb-1">
                <Link className="nav-link mx-2 fs-0.9" to="/login">
                  Login
                </Link>
                <Link className="nav-link mx-2 fs-0.9" to="/login">
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
