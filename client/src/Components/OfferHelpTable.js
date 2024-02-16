import React, { useState } from "react";
import MoreDetails from "./MoreDetailsMainPage.js";
import { Col } from "react-bootstrap";

function OfferHelpTable({ data, totalPosts, loginStatus, loginUsername }) {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const rows = [...Array(Math.ceil(currentPost.length / 4))];
  const productRows = rows.map((row, idx) =>
    currentPost.slice(idx * 4, idx * 4 + 4)
  );
  const content = productRows.map((row, idx) => (
    // <div className="row m-3e" key={idx}>
    //   {row.map((h, i) => (
    //     <Col key={"card" + i} className="card">
    //       <div key={"card-body" + i} className="card-body">
    //         <h2
    //           style={{ fontSize: "20px" }}
    //           key={"card-title" + i}
    //           className="posts card-title mt-0"
    //         >
    //           {h.Category}
    //         </h2>
    //         <p
    //           key={"card-text-description" + i}
    //           className="posts card-text my-0"
    //         >
    //           {h.Description}
    //         </p>
    //         <p key={"card-text-price" + i} className="posts card-text my-1">
    //           $ {h["Ideal Price"]}
    //         </p>
    //         <p key={"card-text-state" + i} className="posts card-text my-1">
    //           {h["State"]}
    //         </p>
    //         <MoreDetails
    //           json={h}
    //           loginStatus={loginStatus}
    //           loginUsername={loginUsername}
    //         />
    //       </div>
    //     </Col>
    //   ))}
    // </div>
  <table className="table" key={idx}>
    <thead>
      <tr>
        <th scope="col" className="text-center">Category</th>
        <th scope="col" className="text-center">Description</th>
        <th scope="col" className="text-center">Ideal Price</th>
        <th scope="col" className="text-center">State</th>
        <th scope="col" className="text-center">Action</th>
      </tr>
    </thead>
    <tbody id="post_content">
      {row.map((h, i) => ( 
        <tr key={i}>
          
          <td className="text-center" >{h.Category}</td>
          <td className="text-center" >{h.Description}</td>
          <td className="text-center" >{h["Ideal Price"]}</td>
          <td className="text-center" >{h.Status}</td>
          <td className="text-center" > 
            <div >
              <MoreDetails
                  json={h}
                  loginStatus={loginStatus}
                  loginUsername={loginUsername}
                  />
            </div>
           </td>

           
         </tr>
       ))}
     </tbody>
     </table>
  ));

  return (
    <>
      {content}
      <nav>
        <ul className={"pagination"}>
          {pageNumbers.map((number) => (
            <li key={number} className={"page-item"}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default OfferHelpTable;
