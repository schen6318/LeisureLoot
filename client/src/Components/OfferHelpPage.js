import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import OfferHelpTable from "./OfferHelpTable.js";
import Navbar from "./Navbar.js";
import Button from "react-bootstrap/Button";
//From here, seek help means posts that seek help
//offer help means posts that offer help

function OfferHelpPage() {
  let [Seeks, setSeeks] = useState([]);
  let [MinValue, setMinValue] = useState(0);
  let [MaxValue, setMaxValue] = useState(10000);
  let [Category_help_Select, SetCategory_help_Select] =
    useState("Select Category");
  let [State_selected, setState_selected] = useState("Select States");
  let [Input_Zipcode, setZipCode] = useState("");
  let [SearchItem, setSearchItem] = useState("");
  let [SortHelperAsc, setHelperAsc] = useState(1);
  let textMinInput = useRef(0);
  let textMaxInput = useRef(100000);
  let zipInput = useRef("");
  let searchInput = useRef("");
  let [login, setLogin] = useState(false);
  let [loginUsername, setLoginUsername] = useState("");

  const States = [
    "",
  ];

  const categoryOptions = [
    "Chore",
    "Academic",
    "Cleaning",
    "House Handy Work",
    "Baby Sitting",
    "Moving",
    "Pet Care",
    "Shopping",
  ];

  let onClickHandler = () => {
    console.log("Min value inserted", textMinInput.current.value);
    console.log("Max value inserted", textMaxInput.current.value);
    setMinValue(parseInt(textMinInput.current.value));
    setMaxValue(parseInt(textMaxInput.current.value));
    setZipCode(zipInput.current.value);
    if (!textMinInput.current.value) {
      setMinValue(0);
    }
    if (!textMaxInput.current.value) {
      setMaxValue(10000000);
    }
    if (!zipInput.current.value) {
      setZipCode("");
    }
  };

  let onSearchHandler = () => {
    setSearchItem(searchInput.current.value);
    if (!searchInput.current.value) {
      setSearchItem("");
    }
  };

  //filter on the posts board on the request and helper table
  function filter_on_post(post, select) {
    let filtered_post = post;
    //Category Filter
    if (select === "Select Category" && Input_Zipcode != null) {
      filtered_post = post;
    }
    if (Input_Zipcode !== "") {
      filtered_post = filtered_post.filter((item) =>
        item["Zip Code"].toString().includes(Input_Zipcode)
      );
    }
    if (SearchItem !== "") {
      filtered_post = filtered_post.filter((item) =>
        item.Address.includes(SearchItem)
      );

    }
    if (select !== "Select Category") {
      filtered_post = filtered_post.filter((item) => item.Category === select);
    }

    if (State_selected !== "Select States") {
      filtered_post = filtered_post.filter(
        (item) => item.State === State_selected
      );
    }

    //Price Range Filter
    filtered_post = filtered_post.filter(
      (item) =>
        item["Ideal Price"] <= MaxValue && item["Ideal Price"] >= MinValue
    );

    return filtered_post;
  }

  //fetch data (Seek Help)
  useEffect(() => {
    async function run() {
      let status = await fetch("/loginStatus");
      let loginStatus = await status.json();
      console.log("Login Status is:", loginStatus.user);
      if (loginStatus.user !== undefined) {
        setLogin(true);
        setLoginUsername(loginStatus.user.username);
      } else {
        setLogin(false);
        setLoginUsername("");
      }
    }

    async function runThis() {
      let raw = await fetch(`api/load-seeks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bol: SortHelperAsc,
        }),
      });
      let res = await raw.json();
      let postTemp2 = [];
      for (const element of res) {
        postTemp2.push(element);
      }
      setSeeks(postTemp2);
    }
    run();
    runThis().catch(console.dir);
  }, [Category_help_Select, SortHelperAsc]);

  function FilterComponentOfferTable() {
    return (
      <Col sm={3}>
        <div className={"mt-1"}>
          <label
            htmlFor={"searchbar"}
            className={"d-inline-block mr-0"}
          ></label>
          <input
            className="d-inline-block ml-1"
            type="text"
            id={"searchbar"}
            ref={searchInput}
            placeholder={"Enter city"}
          />
          <Button
            variant="secondary"
            className="btn btn-secondary d-inline-block ml-2"
            onClick={onSearchHandler}
          >
            Search
          </Button>
        </div>
        <div className={"mt-1"}>
          <select
            className="moredetailbutton"
            aria-label="category"
            value={Category_help_Select}
            onChange={(e) => {
              SetCategory_help_Select(e.target.value);
            }}
          >
            <option key="all" value="Select Category">
              Select Category
            </option>
            {categoryOptions.map((p, i) => (
              <option key={"categoryofferoption" + i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        
        <div className={"mt-1"}>
          <label
            className={"font-weight-bold mt-0"}
            htmlFor={"minidealpricehelper"}
          >
            Minimum Price($)
          </label>
          <input
            type="number"
            id={"minidealpricehelper"}
            className={"ml-2 rounded"}
            ref={textMinInput}
            placeholder={textMinInput.current.value}
          />
          <br />
          <label className={"font-weight-bold"} htmlFor={"maxidealpricehelper"}>
            Maximum Price($)
          </label>
          <input
            type="number"
            id={"maxidealpricehelper"}
            className={"ml-2 rounded"}
            ref={textMaxInput}
            placeholder={textMaxInput.current.value}
          />
          <div className="pt-1">
            <button
              type="button"
              className={"moredetailbutton"}
              onClick={onClickHandler}
            >
              Apply Price Range
            </button>
          </div>
        </div>
        <div className={"mt-1"}>
          <h3
            className={"font-weight-bold d-inline-block mr-2"}
            style={{ fontSize: "20px" }}
          >
            Sort Prices:{" "}
          </h3>
          <button
            className={"sort_button d-inline-block mr-2"}
            onClick={() => setHelperAsc(-1)}
          >
            &#11014;
          </button>
          <button
            type="button"
            className={"sort_button mt-2"}
            onClick={() => setHelperAsc(1)}
          >
            &#11015;
          </button>
        </div>
      </Col>
    );
  }

  //the helper tables with all the offers (Offer help)
  function SeekTableMain() {
    //status pending or open
    let openData = Seeks.filter(item => item["Status"] === 'Pending' || item["Status"] === 'Open');
    let HelperFiltered = filter_on_post(openData, Category_help_Select);
    return (
      <Container fluid className={"mt-5 table"}>
        <Row>
          <FilterComponentOfferTable />
          <Col sm={9}>
            <OfferHelpTable
              data={HelperFiltered}
              totalPosts={HelperFiltered.length}
              loginStatus={login}
              loginUsername={loginUsername}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <Navbar login={login} />
        <br /> <br /> <br /> <br />
        <br /> <br />
        <h1>Help Requests</h1>
        <h2 style={{ fontSize: "25px" }}>
          You can find needs and take order, check details here!
        </h2>
        <SeekTableMain />
      </div>
    </>
  );
}

export default OfferHelpPage;
