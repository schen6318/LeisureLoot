import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ReplyBox from "./ReplyBox.js";
import FinishOrderBox from "./FinishOrderBox.js";
import ChatBox from "./Chat.js";

function MessageReceivedOthers(props) {
  let [message, setMessage] = useState([]);
  const [show, setShow] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [chatBoxShow, setChatBoxShow] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openChat = (username) => {
    setReceiver(username);
    setChatBoxShow(true);
  };

  useEffect(() => {
    async function func() {
      fetch("/api/get-received-othermessage")
        .then((res) => res.json())
        .then((post) => {
          // console.log("Got message", post);
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Message</th>
                  <th scope="col" colSpan="3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody id="message_content">
                {message.map((p, i) => {
                  console.log(p.senderUsername, props.loginUsername);
                  return (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{p.senderUsername}</td>
                      <td
                        style={{
                          cursor: "pointer",
                          backgroundColor: hover ? "#e8e8e8" : "transparent",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={() => openChat(p.receiverUsername)}
                      >
                        {p.receiverUsername}
                      </td>
                      <ChatBox
                        show={chatBoxShow}
                        handleClose={() => setChatBoxShow(false)}
                        receiver={receiver}
                      />
                      <td>{p.message}</td>
                      <td>
                        {p.senderUsername !== props.loginUsername && (
                          <ReplyBox
                            json={p}
                            loginStatus={props.loginStatus}
                            loginUsername={props.loginUsername}
                          />
                        )}
                      </td>
                      <td>
                        {p.message === "Your order has been approved!" && (
                          <FinishOrderBox
                            json={p}
                            loginStatus={props.loginStatus}
                            loginUsername={props.loginUsername}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
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

MessageReceivedOthers.propTypes = {
  postid: PropTypes.string,
};

export default MessageReceivedOthers;
