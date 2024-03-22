import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ReplyBox from "./ReplyBox.js";
import ApproveBox from "./ApproveBox.js";
import RejectBox from "./RejectBox.js";
import ConfirmBox from "./ConfirmBox.js";
import ChatBox from "./Chat.js";

function MessageReceived(props) {
  let [message, setMessage] = useState([]);
  const [show, setShow] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [chatBoxShow, setChatBoxShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openChat = (username) => {
    setReceiver(username);
    setChatBoxShow(true);
  };

  useEffect(() => {
    async function func() {
      fetch("/api/get-received-message")
        .then((res) => res.json())
        .then((post) => {
          console.log("Got message", post);
          setMessage(post.filter((item) => item.postid === props.postid));
        });
    }
    func();
  }, [props.postid]);

  if (message.length === 0) {
    return (
      <>
        <Button variant="primary" onClick={handleShow} disabled={true}>
          No Comment
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Comments ({message.length})
        </Button>

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
            <h6>Note: Click username to start REAL-TIME Chat!</h6>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">From</th>
                  <th scope="col">Message</th>
                  <th scope="col" colSpan="3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody id="message_content">
                {message.map((p, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td
                      className={
                        p.senderUsername !== props.loginUsername
                          ? "hoverable-cell"
                          : ""
                      }
                      onClick={() =>
                        p.senderUsername !== props.loginUsername &&
                        openChat(p.senderUsername)
                      }
                    >
                      {p.senderUsername}
                    </td>
                    <td>{p.message}</td>
                    <ChatBox
                      show={chatBoxShow}
                      handleClose={() => setChatBoxShow(false)}
                      receiver={receiver}
                    />
                    <td>
                      <ReplyBox
                        json={p}
                        loginStatus={props.loginStatus}
                        loginUsername={props.loginUsername}
                      />
                    </td>                   
                    <td>
                      {p.message === "I would like to take order!" && props.status === "Open" && (
                        <ApproveBox
                          json={p}
                          loginStatus={props.loginStatus}
                          loginUsername={props.loginUsername}
                        />
                      )}
                    </td>
                    <td>
                      {p.message === "I would like to take order!" && props.status === "Open" && (
                        <RejectBox
                          json={p}
                          loginStatus={props.loginStatus}
                          loginUsername={props.loginUsername}
                        />
                      )}
                    </td>
                    <td>
                      {p.message ===
                        "I have finished the job. Please confirm!" && props.status === "Finished" && (
                        <ConfirmBox
                          json={p}
                          loginStatus={props.loginStatus}
                          loginUsername={props.loginUsername}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

MessageReceived.propTypes = {
  postid: PropTypes.string,
};

export default MessageReceived;
