import React, { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  where,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import avatar from "../assets/img/profile.png";
import send from "../assets/img/send.png";
import "./chat.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function ChatBox({ show, handleClose, receiver }) {
  const sender = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).username
    : null;
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    orderBy("createdAt"),
    where("sender", "in", [sender, receiver]),
    where("receiver", "in", [sender, receiver]),
    limit(25)
  );
  const messagesEndRef = useRef(null);

  const [messages, loading, error] = useCollectionData(q, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [show, messages]);

  useEffect(() => {
    if (show && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [show]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!sender || !receiver) {
      console.error("Sender or receiver  missing");
      return;
    }
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      sender: sender,
      receiver: receiver,
    });

    setFormValue("");
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className="Chat"
      dialogClassName="modal-dialog-fullscreen"
      contentClassName="modal-content-fullscreen"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chat with {receiver}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <main className="ChatMain">
          {messages &&
            messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} sender={sender} />
            ))}
          <div ref={messagesEndRef} />
        </main>
      </Modal.Body>
      <Modal.Footer>
        <form onSubmit={sendMessage} className="ChatForm">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Text here..."
          />
          <button type="submit" disabled={!formValue}>
            <img src={send} alt="send" style={{ width: "48px" }} />
          </button>
        </form>
      </Modal.Footer>
    </Modal>
  );
}

function ChatMessage({ message, sender }) {
  const messageClass = sender === message.sender ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={avatar} alt="User avatar" />
      <p>{message.text}</p>
    </div>
  );
}

export default ChatBox;
