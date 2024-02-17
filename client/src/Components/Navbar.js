import React from "react";
import logo from "../assets/img/L-lightgreen.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Navbar({ login }) {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-secondary text-uppercase navbar-light"
      id="mainNav"
    >
      <div className="container">
        <img src={logo} alt="Leisure Loot Logo" style={{ width: "100px" }} />
        <a
          className="navbar-brand"
          href="/"
          style={{ position: "relative", marginLeft: "30px" }}
        >
          Leisure Loot
        </a>
        <button
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          className="navbar-toggler text-white bg-primary navbar-toggler-right text-uppercase rounded"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-0 mx-lg-1">
              <Link
                className="nav-link py-3 px-0 px-lg-3 rounded"
                to="/offerHelp"
                style={{ padding: "16px" }}
              >
                find needs
              </Link>
            </li>

            {login ? (
              <>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded"
                    to="/Manage"
                  >
                    manage my needs
                  </Link>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded"
                    to="/"
                    onClick={handleLogout}
                  >
                    log out
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded"
                  to="/Login"
                >
                  log in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
