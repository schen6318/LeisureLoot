import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    city: "",
  });
  const [current_Status, set_Status] = useState("");
  const navigate = useNavigate();

  let usernameChange = (event) => {
    setUser({
      username: event.target.value,
      password: user.password,
      city: user.city,
    });
  };
  let passwordChange = (event) => {
    setUser({
      username: user.username,
      password: event.target.value,
      city: user.city,
    });
  };
  let cityChange = (event) => {
    setUser({
      username: user.username,
      password: user.password,
      city: event.target.value,
    });
  };

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        let status = await fetch("/loginStatus");
        let loginStatus = await status.json();
        if (loginStatus.user !== undefined) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    }
    checkLoginStatus();
  }, []);

  const handleAuth = async (event) => {
    console.log("handleAuth called");
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (result.status === "account-exists") {
        set_Status("The username already exists. Please try another one!");
      } else if (result.status === "success") {
        navigate("/login");
      } else {
        set_Status("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Failed to register:", error);
      set_Status("An error occurred during registration.");
    }
  };

  let [login, setLogin] = useState(false);

  return (
    <>
      <Navbar login={login} />
      <header className="text-center text-white bg-primary masthead">
        <section className="position-relative py-4 py-xl-5">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Sign Up</h2>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                  <div className="card-body d-flex flex-column align-items-center">
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="bi bi-person"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                      </svg>
                    </div>
                    <form
                      className="text-center"
                      method="post"
                      onSubmit={handleAuth}
                    >
                      <div className="mb-3">
                        <input
                          type="email"
                          name="username"
                          value={user.username}
                          onChange={usernameChange}
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={passwordChange}
                          placeholder="Password"
                          required
                        />
                      </div>
                      <input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={cityChange}
                        placeholder="City"
                        required
                      />
                      <div className="mb-3" />
                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-block w-100"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                      {current_Status && <p>{current_Status}</p>}
                      <p className="text-muted">
                        Already our member?
                        <Link to="/Login" style={{ margin: "0 10px" }}>
                          Log in!
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
      <Footer />
    </>
  );
}

export default Signup;
