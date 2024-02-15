import React from "react";
import ContactForm from "./ContactForm";
const profileImg = "/assets/img/profile.png";
const cabinImg = "/assets/img/portfolio/cabin.png";
const cakeImg = "/assets/img/portfolio/cake.png";
const circusImg = "/assets/img/portfolio/circus.png";
const gameImg = "/assets/img/portfolio/game.png";
const safeImg = "/assets/img/portfolio/safe.png";
const submarineImg = "/assets/img/portfolio/submarine.png";

function Home() {
  return (
    <div>
      <header className="text-center text-white bg-primary masthead">
        <div className="container">
          <img
            className="img-fluid d-block mx-auto mb-5"
            src={profileImg}
            alt="Profile"
          />
          <h1 style={{ "--bsBodyFontSize": "1rem" }}>UNLOCK YOUR POTENTIAL</h1>
          <hr className="star-light" />
          <h2 className="font-weight-light mb-0">
            Share Your Skills, Earn Extra Income!
          </h2>
        </div>
      </header>
      <section id="portfolio" className="portfolio">
        <div className="container">
          <h2 className="text-uppercase text-center text-secondary">
            Category of Skills
          </h2>
          <hr className="star-dark mb-5" />
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <a
                className="d-block mx-auto portfolio-item"
                href="#portfolio-modal-1"
                data-bs-toggle="modal"
              >
                <div className="d-flex portfolio-item-caption position-absolute h-100 w-100">
                  <div className="text-center text-white my-auto portfolio-item-caption-content w-100">
                    <i className="fa fa-search-plus fa-3x" />
                  </div>
                </div>
                <img className="img-fluid" src={cabinImg} />
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a
                className="d-block mx-auto portfolio-item"
                href="#portfolio-modal-2"
                data-bs-toggle="modal"
              >
                <div className="d-flex portfolio-item-caption position-absolute h-100 w-100">
                  <div className="text-center text-white my-auto portfolio-item-caption-content w-100">
                    <i className="fa fa-search-plus fa-3x" />
                  </div>
                </div>
                <img className="img-fluid" src={cakeImg} />
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a
                className="d-block mx-auto portfolio-item"
                href="#portfolio-modal-3"
                data-bs-toggle="modal"
              >
                <div className="d-flex portfolio-item-caption position-absolute h-100 w-100">
                  <div className="text-center text-white my-auto portfolio-item-caption-content w-100">
                    <i className="fa fa-search-plus fa-3x" />
                  </div>
                </div>
                <img className="img-fluid" src={circusImg} />
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a
                className="d-block mx-auto portfolio-item"
                href="#portfolio-modal-4"
                data-bs-toggle="modal"
              >
                <div className="d-flex portfolio-item-caption position-absolute h-100 w-100">
                  <div className="text-center text-white my-auto portfolio-item-caption-content w-100">
                    <i className="fa fa-search-plus fa-3x" />
                  </div>
                </div>
                <img className="img-fluid" src={gameImg} />
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a
                className="d-block mx-auto portfolio-item"
                href="#portfolio-modal-5"
                data-bs-toggle="modal"
              >
                <div className="d-flex portfolio-item-caption position-absolute h-100 w-100">
                  <div className="text-center text-white my-auto portfolio-item-caption-content w-100">
                    <i className="fa fa-search-plus fa-3x" />
                  </div>
                </div>
                <img className="img-fluid" src={submarineImg} />
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a
                className="d-block mx-auto portfolio-item"
                href="#portfolio-modal-6"
                data-bs-toggle="modal"
              >
                <div className="d-flex portfolio-item-caption position-absolute h-100 w-100">
                  <div className="text-center text-white my-auto portfolio-item-caption-content w-100">
                    <i className="fa fa-search-plus fa-3x" />
                  </div>
                </div>
                <img className="img-fluid" src={safeImg} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="text-white bg-primary mb-0" id="about">
        <div className="container">
          <h2 className="text-uppercase text-center text-white">About</h2>
          <hr className="star-light mb-5" />
          <div className="row">
            <div className="col-lg-4 ms-auto">
              <p className="lead">
                Welcome to Leisure Loot, where your experience creates
                opportunities. Here, we believe everyone has unique skills that
                can benefit others.&nbsp;
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                Whether you're a student eager to apply your learnings, a
                professional seeking to expand your reach, or a hobbyist looking
                to share your own passion, our platform connects you with those
                who seek your skills.
              </p>
            </div>
            <div className="col-lg-4 me-auto">
              <p className="lead">
                Embrace the chance to grow your network, find collaborative
                projects, or simply share what you love. Start your journey with
                us today!
              </p>
            </div>
          </div>
          <div className="text-center mt-4">
            <a
              className="btn btn-outline-light btn-xl"
              role="button"
              href="/Signup"
            >
              <i
                className="fa fa-users me-2"
                style={{ fontSize: "30px", padding: "0 10px" }}
              />
              <strong>JOIN NOW!</strong>
            </a>
          </div>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}

export default Home;
