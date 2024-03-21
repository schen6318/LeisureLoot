import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useUser, RefreshDataContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
// import Categories from "../Other Components/Categories";

const GEOCODING_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

function ModifyPost(props) {
  let [Subject, setSubject] = useState(props.information.Description);
  let [Category, setCategory] = useState(props.information.Category);
  let [Price, setPrice] = useState(props.information["Ideal Price"]);
  let [OriginalPrice, setOriginalPrice] = useState(
    props.information["Ideal Price"]
  );
  let [Date, setDate] = useState(props.information["Date for task"]);
  let [Zipcode, setZipcode] = useState(props.information["Zip Code"]);
  let [Address, setAddress] = useState(props.information["Address"]);
  let [Latitude, setLatitude] = useState(props.information.Latitude);
  let [GeoState, setGeoState] = useState(props.information["State"]);
  let [Longitude, setLongitude] = useState(props.information.Longitude);
  let [Error, setError] = useState("");
  let [points, setPoints] = useState(props.Points);
  const { user } = useUser();
  const navigate = useNavigate();
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  const Mode = props.information.Mode;
  const id = props.information._id;
  const categoryOptions = [
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

  let priceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
  };
  let dateChange = (event) => {
    setDate(event.target.value);
  };

  let categoryChange = (event) => {
    setCategory(event.target.value);
  };

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
      console.error("Error fetching points", error);
    }
  }

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
  const handleEdit = async () => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
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
     
      try {
        if (Price !== OriginalPrice) {
          // The price has changed, so we need to update the points
          if (Price > OriginalPrice) {
            // The price has increased, so we need to deduct the difference from the user's points
            const pointsToDeduct = Price - OriginalPrice;
            await fetch(`/api/deductPoints`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user.id,
                pointsToDeduct: pointsToDeduct,
              }),
            });
          } else if (Price < OriginalPrice) {
            // The price has decreased, so add the difference to the user's points
            const pointsToAdd = OriginalPrice - Price;
            await fetch("/api/update-points", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.id,
                pointsToAdd: pointsToAdd,
              }),
            });
          }
          // Update the original price
          setOriginalPrice(Price);
        }

        await fetch("/api/edit-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: id,
            Mode: "SeekHelp",
            Description: Subject,
            Category: Category,
            "Ideal Price": parseInt(Price),
            "Date for task": Date,
            "Zip Code": Zipcode,
            Address: Address,
            Latitude: Latitude,
            Longitude: Longitude,
            State: GeoState,
          }),
        });
        setShow(false);
        window.location.reload(true);
      } catch (e) {}
    }
  };

  //when the user hit the delete button of the form
  const handleDelete = async () => {
    //we also need to add a type checker to ensure numbers are numbers, strings are strings etc.
    const refund = parseInt(Price);
    try {
      await fetch("/api/refundPoints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          postId: id,
          refund: refund,
        }),
      });
      await fetch("/api/delete-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
          Mode: "SeekHelp",
          Description: Subject,
          Category: Category,
          "Ideal Price": Price,
          "Date for task": Date,
          "Zip Code": Zipcode,
          Address: Address,
        }),
      });
      setShow(false);
      window.location.reload(true);
    } catch (e) {}
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    fetchPoints();
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Edit or Delete
      </Button>

      <Modal
        show={show}
        id="modifyPost"
        onHide={handleClose}
        aria-labelledby={"modifyPost"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit or Delete</Modal.Title>
        </Modal.Header>
        <form id="contact-form" name="contact-form">
          <Modal.Body>
            <label>Category:</label>          
            <select
              className={"category mb-2"}
              aria-label="category"
              value={Category}
              onChange={categoryChange}
            >
              
              {categoryOptions.map((p, i) => (
                <option key={"categoryoption" + i} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <div className="row">
              <div className="col-md-12">
                <div className="md-form mb-0">
                  <label htmlFor="subject" className="">
                    Description
                  </label>
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
                    Points Balance:
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
                    type="number"
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
                  <label htmlFor="date" className="">
                    Date for Task
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={Date}
                    onChange={dateChange}
                  />
                  <br />
                </div>
              </div>
            </div>

            <div>
              <label>Location:</label>
              <input style={{ width: "80%" }}
                type="text"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder=""
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
              <p>Please follow the format: Street, City, State Zip Code or fetch</p>
            </div>
            <p style={{ color: "red" }}>{Error}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEdit}>
              Save Changes
            </Button>
            <Button
              variant="primary"
              onClick={handleDelete}
              style={{ backgroundColor: "#BF181D" }}
            >
              Delete Post
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

ModifyPost.propTypes = {
  information: PropTypes.object,
};
export default ModifyPost;
