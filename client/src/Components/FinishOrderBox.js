import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function CommentBox(props) {
  let postid = props.json._id;
  let [message, setmessage] = useState("");
  const [show, setShow] = useState(false);
  let [usable, setUsable] = useState(false);
  let [buttonText, setButtonText] = useState("Login to Send Message");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //when the user hit the submit button of the form
  const handleSubmit = async () => {
    await fetch("/api/submit-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postid: props.json.postid,
        senderUsername: props.loginUsername,
        receiverUsername: props.json.senderUsername,
        message: message,
      }),
    });
    console.log(props.loginUsername, props.json.postid);
    // Update the status of the post
    await fetch("/api/update-post-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: props.json.postid,
        Mode: "SeekHelp",
        Status: "Finished",
      }),
    });
    setShow(false);
    window.location.reload(true);
  };

  useEffect(() => {
    if (props.loginStatus) {
      setUsable(true);
      setButtonText("Finish Order");
      setmessage('I have finished the job. Please confirm!');
    } else {
      setUsable(false);
      setButtonText("Login to Send Message");
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
          <Modal.Title>Finish Order!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label hidden={true}>Message</label>
          <textarea
            type="text"
            id="subject"
            name="subject"
            defaultValue={message}
            readOnly
            className="form-control"
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
