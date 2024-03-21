import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useUser, RefreshDataContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const GEOCODING_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

function SubmitForm() {
  let [Subject, setSubject] = useState("");
  let [Category, setCategory] = useState("Select Category");
  let [points, setPoints] = useState("");
  let [Price, setPrice] = useState("");
  let [Date, setDate] = useState("");
  let [Zipcode, setZipcode] = useState("");
  let [Address, setAddress] = useState("");
  let [Latitude, setLatitude] = useState(0);
  let [State, setState] = useState("");
  let [Longitude, setLongitude] = useState(0);
  let [show, setShow] = useState(false);
  let [Error, setError] = useState("");
  // Add a new state variable for status
  let [Status, setStatus] = useState("Open");
  const { user } = useUser();
  const navigate = useNavigate();
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  const categoryOptions = [
    "Select Category",
    "Chore",
    "Academic",
    "Cleaning",
    "House Handy Work",
    "Baby Sitting",
    "Moving",
    "Pet Care",
    "Shopping",
  ];

  let subjectChange = (event) => {
    setSubject(event.target.value);
  };

  // useEffect(() => {

  // }, []);

  async function fetchPoints() {
    try {
      console.log("Fetching points...");
      console.log(user);
      const response = await fetch(`/api/check-points/${user.id}`);
      console.log("Response:", response);
      if (!response.ok) {
        console.error("Fetch failed:", response.statusText);
        return;
      }
      const data = await response.json();
      console.log("Data:", data);
      if (data.error) {
        console.error("Error fetching points:", data.error);
      } else {
        setPoints(data.points);
        console.log("Points:", data.points);
      }
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  }

  // Call fetchPoints in handleShow
  const handleShow = () => {
    setSubject("");
    setCategory("Select Category");
    setPrice("");
    setDate("");
    fetchPoints();
    setShow(true);
  };

  let priceChange = (event) => {
    setPrice(event.target.value);
  };
  let dateChange = (event) => {
    setDate(event.target.value);
  };

  const handleFetchAddress = (event) => {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEOCODING_API_KEY}`;

          try {
            const response = await fetch(geocodingUrl);
            const data = await response.json();
            if (data.status === "OK") {
              const fetchedAddress = data.results[0].formatted_address;
              setAddress(fetchedAddress);
            } else {
              console.error("Geocoding failed:", data.status);
            }
          } catch (error) {
            console.error("Error fetching geocoding data:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  //when the user hit the submit button of the form
  const handleSubmit = async () => {
    if (Category === "Select Category" || isNaN(parseInt(Price))) {
      if (Category === "Select Category" && isNaN(parseInt(Price))) {
        setError("Please select a category and input a valid price.");
      } else if (Category === "Select Category") {
        setError("Please select a category.");
      } else if (isNaN(parseInt(Price))) {
        setError("Price given is invalid. Please try again.");
      }
    } else if (parseInt(Price) > parseInt(points)) {
      setError(
        "You don't have enough points to post this task, please go to profile to deposit more points."
      );
    } else {
      const pointsToDeduct = parseInt(Price);
      // console.log(user);
      try {
        await fetch(`/api/deductPoints`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            pointsToDeduct: pointsToDeduct,
          }),
        });

        await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Mode: "SeekHelp",
            Description: Subject,
            Category: Category,
            "Ideal Price": parseInt(Price),
            "Date for task": Date,
            "Zip Code": Zipcode,
            Address: Address,
            Latitude: Latitude,
            Longitude: Longitude,
            State: State,
            Status: Status, // Include status in the request body
          }),
        });

        setStatus("Open");
        setShow(false);
        setRefreshData(true);
        // Wait for a short time before navigating to the new page
        setTimeout(() => {
          navigate("/manage");
        }, 100);
      } catch (e) {}
    }
  };

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Submit a New Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id="submitPost"
        aria-labelledby="submitPost"
      >
        <Modal.Header closeButton>
          <Modal.Title>Submit a New Post</Modal.Title>
        </Modal.Header>
        <form id="contact-form" name="contact-form">
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <select
                  className="category my-3"
                  aria-label="category"
                  value={Category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categoryOptions.map((p, i) => (
                    <option key={"categoryoptions" + i} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="subject">Description</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={Subject}
                    onChange={subjectChange}
                    className="form-control"
                  />
                  <br />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="points" style={{ marginRight: "10px" }}>
                    Points balance:
                  </label>
                  <span id="points">{points}</span>
                  <br />
                </div>
              </div>
            </div>

            <br />
            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="price">Price (points)</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className="form-control"
                    value={Price}
                    onChange={priceChange}
                  />
                  <br />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="date">Date for Subject</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="form-control"
                    value={Date}
                    onChange={dateChange}
                  />
                  <br />
                </div>
              </div>
            </div>

            
            <div>
              <label htmlFor="location" style={{ marginRight: "10px" }}>
                Location:
              </label>
              <input style={{width: "75%"}}
                type="text"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter in the format: Street, City, State Zip Code or fetch"
              />
              <button type="button" onClick={handleFetchAddress}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24.002"
                  id="location"
                >
                  <g fill="none">
                    <path d="M0 0h24v24.002H0z"></path>
                    <path d="M0 0h24v24.002H0z"></path>
                  </g>
                  <g fill="#757575">
                    <circle cx="12" cy="12.002" r="3"></circle>
                    <path d="M22 11.002h-2.069A8.007 8.007 0 0 0 13 4.071V2.002h-2v2.069a8.008 8.008 0 0 0-6.931 6.931H2v2h2.069A8.008 8.008 0 0 0 11 19.933v2.069h2v-2.069a8.008 8.008 0 0 0 6.931-6.931H22v-2zm-10 7c-3.309 0-6-2.692-6-6s2.691-6 6-6 6 2.692 6 6-2.691 6-6 6z"></path>
                  </g>
                </svg>
              </button>
              
            </div>
            
            <p style={{ color: "red" }}>{Error}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              htmlFor="subject"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default SubmitForm;
