import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Map from "./map.js";
import PropTypes from "prop-types";
import CommentBox from "./CommentBox.js";
import TakeOrderBox from "./TakeOrderBox.js";
import GetAddress from "./GetAddress.js";
import GetMap from "./GetMap";

function MoreDetails(props) {
  console.log(props.json); // 这里打印props.json的内容
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className={"moredetailbutton"}
        variant="primary"
        onClick={handleShow}
        style={{ width: "100px" }}
      >
        Details
      </button>

      <Modal
        show={show}
        id={"moreDetailModal"}
        onHide={handleClose}
        aria-labelledby="moreDetailModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Email: {props.json.username}</p>
          <p>Category: {props.json.Category}</p>
          <p>Description: {props.json.Description}</p>
          <p>Price: {props.json["Ideal Price"]} points</p>
          <p>Address: {props.json.Address}</p>
          <p>Location on Map:</p>
          <div>
            <GetAddress
              address={props.json.Address}
              onCoordinatesFetched={setCoordinates}
            />
            {coordinates && <GetMap center={coordinates} />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {props.loginUsername !== props.json.username && (
            <TakeOrderBox
              json={props.json}
              loginStatus={props.loginStatus}
              loginUsername={props.loginUsername}
            />
          )}
          {props.loginUsername !== props.json.username && (
            <CommentBox
              json={props.json}
              loginStatus={props.loginStatus}
              loginUsername={props.loginUsername}
            />
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

MoreDetails.propTypes = {
  json: PropTypes.object,
};

export default MoreDetails;
