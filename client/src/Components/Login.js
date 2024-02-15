import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Modal, Button } from "react-bootstrap";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [currentStatus, setCurrentStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setUser: setGlobalUser } = useUser();

  let usernameChange = (event) => {
    setUser({
      username: event.target.value,
      password: user.password,
    });
  };
  let passwordChange = (event) => {
    setUser({
      username: user.username,
      password: event.target.value,
    });
  };

  const [loginResult, setLoginResult] = useState(null);

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      setLoginResult(result);

      if (result.status === false) {
        setCurrentStatus("Incorrect username/password! Please try again!");
      } else if (result.status === true && result.user && result.user.id) {
        setGlobalUser({ username: result.user.username, id: result.user.id });
        setShowModal(true);
      } else {
        console.error("Unexpected response structure:", result);
      }
    } catch (error) {
      console.error("Login error:", error);
      setCurrentStatus("An error occurred. Please try again later.");
    }
  };

  const handleUpdateProfile = () => {
    navigate(`/profile/${loginResult.user.id}`);
    setShowModal(false);
  };

  const handleSkipUpdate = () => {
    navigate("/manage");
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <header className="text-center text-white bg-primary masthead">
        <div className="container">
          <section className="position-relative py-4 py-xl-5">
            <div className="container">
              <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <h2>Log in</h2>
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
                            className="form-control form-control"
                            type="email"
                            name="username"
                            value={user.username}
                            onChange={usernameChange}
                            placeholder="Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={passwordChange}
                            placeholder="Password"
                          />
                        </div>
                        <div className="mb-3" />
                        <div className="mb-3">
                          <button
                            className="btn btn-primary d-block w-100"
                            type="submit"
                          >
                            Log in
                          </button>
                        </div>
                        {currentStatus && <p>{currentStatus}</p>}
                        <p className="text-muted">
                          Not member yet?
                          <Link to="/Signup" style={{ margin: "0 10px" }}>
                            Create account!
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to update your profile?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSkipUpdate}>
            No
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

export default Login;
