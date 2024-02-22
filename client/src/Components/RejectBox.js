import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function CommentBox(props) {
  let postid = props.json.postid;
  let [message, setmessage] = useState("");
  const [show, setShow] = useState(false);
  let [usable, setUsable] = useState(false);
  let [buttonText, setButtonText] = useState("Login to Reject the order");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //when the user hit the submit button of the form
  const handleSubmit = async () => {
    await fetch("/api/submit-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postid: postid,
        senderUsername: props.loginUsername,
        receiverUsername: props.json.senderUsername,
        message: message,
      }),
    });
    // Update the status of the post
    await fetch("/api/update-post-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: postid,
        Mode: "SeekHelp",
        Status: "Open",
      }),
    });
    setShow(false);
    window.location.reload(true);
  };

  useEffect(() => {
    if (props.loginStatus) {
      setUsable(true);
      setButtonText("Reject");
      setmessage('Sorry, your order has been rejected!');
    } else {
      setUsable(false);
      setButtonText("Login to Reject the order");
    }
  }, [props.loginStatus]);

  return (
    <>
        <Button
          className={"sendmessagebutton"}
          variant="primary"
          onClick={handleShow}
          disabled={!usable}
        >
          {buttonText}
        </Button>

      <Modal
        show={show}
        id={"messageModal"}
        onHide={handleClose}
        aria-labelledby="messageModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reject the order!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label hidden={true}>Message</label>
          <textarea
            type="text"
            id="subject"
            name="subject"
            value={message}
            onChange={(event) => setmessage(event.target.value)}
            className="form-control"
            placeholder={"Message"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"secondary"} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CommentBox.propTypes = {
  json: PropTypes.object,
  loginUsername: PropTypes.string,
  loginStatus: PropTypes.bool,
};
export default CommentBox;
