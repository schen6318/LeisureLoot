// Main.js
import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import WebFont from "webfontloader";
import "./assets/css/GlobalStyles.css";
import { useUser } from "./contexts/UserContext";

WebFont.load({
  google: {
    families: ["Montserrat:400,700", "Lato:400,700,400italic,700italic"],
  },
});

function Main() {
  const { user } = useUser();

  return (
    <div>
      <Navbar login={!!user} />
      <Home />
      <Footer />
    </div>
  );
}

export default Main;
