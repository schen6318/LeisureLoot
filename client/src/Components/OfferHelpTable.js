import React, { useState } from "react";
import MoreDetails from "./MoreDetailsMainPage.js";


function OfferHelpTable({ data, totalPosts, loginStatus, loginUsername }) {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);
  // Calculate page numbers
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  
  const content = (
    <table className="table">
      <thead>
        <tr>
          <th scope="Col" className="text-center">Publisher</th>
          <th scope="Col" className="text-center">Category</th>
          <th scope="Col" className="text-center">Description</th>
          <th scope="Col" className="text-center">Price (points)</th>
          <th scope="Col" className="text-center">Date for task</th>
          <th scope="Col" className="text-center">City</th>
          <th scope="Col" className="text-center">Action</th>
        </tr>
      </thead>
      <tbody id="post_content">
        {currentPost.map((h, i) => ( 
          <tr key={i}>
            <td className="text-center" >{h.username}</td>
            <td className="text-center" >{h.Category}</td>
            <td className="text-center" >{h.Description.length > 10 ? h.Description.slice(0, 10) + '...' : h.Description}</td>
            <td className="text-center" >{h["Ideal Price"]}</td>
            <td className="text-center" >{h["Date for task"]}</td>
            <td className="text-center" >{h.Address.split(',')[1]}</td>
            <td className="text-center" > 
              <div style={{ width:"100px"}}>
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
  );

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
