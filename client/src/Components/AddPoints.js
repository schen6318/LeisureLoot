import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function AddPoints({ show, handleClose, userId }) {
  const [points, setPoints] = useState("");
  const [, dispatch] = usePayPalScriptReducer();
  const navigate = useNavigate();

  const handlePaymentSuccess = (details, data) => {
    console.log("Payment successful!", details);
    fetch("/api/update-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        pointsToAdd: points,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Points updated successfully", data);
        handleClose();
        alert(`You have successfully added ${points} points to your account.`);
        navigate(`/profile/${userId}`);
      })
      .catch((error) => {
        console.error("Error updating points:", error);
      });
  };

  useEffect(() => {
    if (show) {
      dispatch({
        type: "resetOptions",
        value: {
          "client-id":
            "Ad9FeB4Sa6bI-uP6YXN1nmC7wHjJn7DKm640VvnTclAp-qt-8J42TwFIt7m9yOQqj5nx4bxj1Ja6CH9G",
          currency: "CAD",
          intent: "capture",
        },
      });
      dispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [show, points, dispatch]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Points</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Points to Add</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
            <Form.Text className="text-muted">
              Notes: Each point costs 1.00 CAD.
            </Form.Text>
          </Form.Group>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: points,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                handlePaymentSuccess(details, data);
              });
            }}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddPoints;
