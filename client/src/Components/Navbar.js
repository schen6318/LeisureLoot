import React from "react";
import logo from "../assets/img/L-lightgreen.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", { method: "GET" });
      if (response.ok) {
        logout();
        navigate("/");
        console.log("Logged out successfully");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-secondary text-uppercase navbar-light"
      id="mainNav"
    >
      <div className="container">
        <img src={logo} alt="Leisure Loot Logo" style={{ width: "100px" }} />
        <Link
          className="navbar-brand"
          to="/"
          style={{ position: "relative", marginLeft: "30px" }}
        >
          Leisure Loot
        </Link>
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
            {user ? (
              <>
                <li className="nav-item mx-0 mx-lg-1">
                  <Link
                    className="nav-link py-3 px-0 px-lg-3 rounded"
                    to="/Manage"
                  >
                    my needs
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
                <li>
                  <a
                    href={`/profile/${user.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      id="User"
                    >
                      <path
                        fill="#18bc9c"
                        fill-rule="evenodd"
                        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z"
                        clip-rule="evenodd"
                        class="color000000 svgShape"
                      ></path>
                    </svg>
                  </a>
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
