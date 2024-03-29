import React, { useEffect, useState, useContext } from "react";
import ModifyPost from "./modify_post.js";
import SubmitForm from "./submitform.js";
import MessageReceived from "./MessageReceived.js";
import MessageReceivedOthers from "./MessageReceivedOthers.js";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import {useUser, RefreshDataContext} from "../contexts/UserContext.js"

function PostForm2() {
  //all posts that belongs to this user.
  const [Post, setPosts] = useState([]);
  let [login, setLogin] = useState(false);
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);
  const [otherPost, setOtherPosts] = useState([]);
  const [loginUsername, setLoginUsername] = useState("");
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    async function func() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      if (loginStatus.user !== undefined) {
        setLogin(true);
        setLoginUsername(loginStatus.user.username);
        fetch("/api/load-user-posts")
          .then((res) => res.json())
          .then((post) => {
            console.log("Got post", post);
            setPosts(post);
          });
      } else if (isLoggedIn) { 
        setLogin(true);
        console.log(user);
      }
    }
    func().catch(console.dir());
  }, [refreshData, isLoggedIn]);

  function LoadPost() {
    if (Post.length === 0) {
      return (
        <p style={{ fontSize: "30px" }}>
          No post is available for this account😅 Please submit a post first.
        </p>
      );
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Publisher</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Price (points)</th>
              <th scope="col">Date for task</th>           
              <th scope="col">Address</th>
              <th scope="col">Post Status</th>
              <th scope="col">Comments</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody id="post_content">
            {Post.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.username}</td>
                <td>{p.Category}</td>
                <td>{p.Description}</td>
                <td>{p["Ideal Price"]}</td>
                <td>{p["Date for task"]}</td>   
                <td>{p.Address}</td>    
                <td>{p.Status}</td>
                <td>
                  <MessageReceived status={p.Status} postid={p._id} loginStatus={login} loginUsername={loginUsername}/>
                </td>
                <td>
                  <ModifyPost information={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  useEffect(() => {
    async function func() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      if (loginStatus.user !== undefined) {
        setLogin(true);
        setLoginUsername(loginStatus.user.username);
        fetch("/api/load-other-posts")
          .then((res) => res.json())
          .then((post) => {
            console.log("Got post", post);
            setOtherPosts(post);
          });
      }
    }
    func().catch(console.dir());
  }, [refreshData]);

  function LoadOtherPost() {
    if (otherPost.length === 0) {
      return (
        <p style={{ fontSize: "30px" }}>
          You did not comment any posts. Go to "Find needs" by navigation.
        </p>
      );
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Publisher</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Price (points)</th>
              <th scope="col">Date for task</th>
              
              <th scope="col">Address</th>         
              <th scope="col">Post Status</th>
              <th scope="col">Comments</th>
            </tr>
          </thead>
          <tbody id="post_content">
            {otherPost.map((p, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{p.username}</td>
                <td>{p.Category}</td>
                <td>{p.Description}</td>
                <td>{p["Ideal Price"]}</td>
                <td>{p["Date for task"]}</td>
                
                <td>{p.Address}</td>
                
                <td>{p.Status}</td>
                <td>
                  <MessageReceivedOthers status={p.Status} postid={p._id} loginStatus={login} loginUsername={loginUsername}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  return (
    <>
      <Navbar login={login}/>
      <header className="text-center text-white bg-primary masthead">
        <h1 style={{ fontSize: "3rem" }}>Welcome</h1>
      </header>
      <div className="container text-center">
        <p></p>
        <SubmitForm />
  
        <section className="pt-5 container">
          <h2 className="h2-responsive font-weight-bold text-left my-4">
            My Published Posts
          </h2>
          <LoadPost />
        </section>
        <section className="pt-5 container">
          <h2 className="h2-responsive font-weight-bold text-left my-4">
            My Commented Posts
          </h2>
          <LoadOtherPost />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default PostForm2;
