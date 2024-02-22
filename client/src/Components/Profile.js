import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AddPoints from "./AddPoints.js";
import RefreshIcon from "../assets/img/refresh.png";

function Profile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    category: "",
    description: "",
    points: 0, //initialize points
  });
  let [login] = useState(false);

  const [showAddPoints, setShowAddPoints] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    } else {
      console.log("No user id found, assuming new or not logged in user.");
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profile/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        console.log("Profile updated successfully.");
        navigate("/manage");
      } else {
        const error = await response.json();
        console.error("Failed to update profile:", error.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`/api/profile/${userId}`);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          zip: data.zip || "",
          category: data.category || "",
          description: data.description || "",
          points: data.points || 0,
        });
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleCancel = () => {
    if (userId) {
      fetchUserProfile(userId);
    }
  };

  //open add points modal
  const handleAddPoints = () => {
    setShowAddPoints(true);
  };

  // refresh user points
  const handleRefresh = () => {
    fetchUserProfile(userId);
  };

  return (
    <>
      <Navbar login={login}/>
      <header className="text-center text-white bg-primary masthead">
        <h1 style={{ fontSize: "3rem" }}>My Profile</h1>
      </header>
      <section className="bg-primary" style={{ padding: "0 0 100px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col col-md-3 col-sm-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile">
                      <div className="user-avatar">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Maxwell Admin"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </div>
                      <h5 className="user-name">
                        {profile.fullName || "Your Full Name"}
                      </h5>
                      <h6 className="user-email">
                        {profile.email || "email@example.com"}
                      </h6>
                    </div>
                    <div className="about">
                      <h5>About</h5>
                      <p>
                        {profile.description ||
                          `Your skill description will be displayed here. For example, I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.`}
                      </p>
                    </div>
                    <div className="about">
                      <h5>Points: {profile.points}</h5>

                      <button
                        className="btn btn-primary"
                        onClick={handleAddPoints}
                      >
                        Add Points
                      </button>
                      <button
                        onClick={handleRefresh}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={RefreshIcon}
                          alt="Refresh Points"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </button>
                      {showAddPoints && (
                        <PayPalScriptProvider
                          options={{
                            "client-id":
                              "ARpYR5BA7ypNC7jb8hc6m5kugA-_fxpSXHFvZCuxhSaBzERPOzmcP8GKvWx3vOZ9yOCuKXiyGOOq7aF1",
                          }}
                        >
                          <AddPoints
                            show={showAddPoints}
                            handleClose={() => setShowAddPoints(false)}
                            userId={userId}
                          />
                        </PayPalScriptProvider>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-9">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col col-md-6 col-sm-12">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6
                          className="text-primary mb-2"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Personal Details
                        </h6>
                        <div className="form-group">
                          <label htmlFor="fullName">Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            value={profile.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            className="form-label form-label"
                            htmlFor="phone"
                          >
                            Phone
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            className="form-label form-label"
                            htmlFor="website"
                          >
                            Website URL
                          </label>
                          <input
                            type="url"
                            className="form-control"
                            id="website"
                            name="website"
                            value={profile.website}
                            onChange={handleChange}
                            placeholder="Enter Website URL"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col-md-6 col-sm-12">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6
                          className="text-primary mb-2"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Address
                        </h6>
                        <div className="form-group">
                          <label htmlFor="street">Street</label>
                          <input
                            type="text"
                            className="form-control"
                            id="street"
                            name="street"
                            value={profile.street}
                            onChange={handleChange}
                            placeholder="Enter Street"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            className="form-label form-label"
                            htmlFor="city"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={profile.city}
                            onChange={handleChange}
                            placeholder="Enter City"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            className="form-label form-label"
                            htmlFor="state"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={profile.state}
                            onChange={handleChange}
                            placeholder="Enter State"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            className="form-label form-label"
                            htmlFor="zip"
                          >
                            Zip Code
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="zip"
                            name="zip"
                            value={profile.zip}
                            onChange={handleChange}
                            placeholder="Enter Zip Code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col col-12">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6
                          className="text-primary mt-3 mb-2"
                          style={{ fontSize: "1.5rem" }}
                        >
                          About Your Skill
                        </h6>
                        <div className="form-group">
                          <label htmlFor="category">Category</label>
                          <select
                            className="form-control"
                            id="category"
                            name="category"
                            value={profile.category}
                            onChange={handleChange}
                          >
                            <option value="">Please Select</option>
                            <option value="Craft">Craft</option>
                            <option value="Cake">Cake</option>
                            <option value="IT">IT</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={profile.description}
                            onChange={handleChange}
                            placeholder="Please tell us some details about your skill..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-xl-flex justify-content-xl-center align-items-xl-center text-right">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary"
                            type="submit"
                            style={{ margin: "20px" }}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
