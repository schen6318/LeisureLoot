import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactForm from "./ContactForm";
const profileImg = "/assets/img/profile.png";
const cabinImg = "/assets/img/portfolio/cabin.png";
const cakeImg = "/assets/img/portfolio/cake.png";
const circusImg = "/assets/img/portfolio/circus.png";
const gameImg = "/assets/img/portfolio/game.png";
const safeImg = "/assets/img/portfolio/safe.png";
const submarineImg = "/assets/img/portfolio/submarine.png";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <div>
      <header className="text-center text-white bg-primary masthead">
        <div className="container">
          <div className="container">
            <Slider {...settings}>
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
                  <img className="img-fluid" src={cabinImg} alt="cabin" />
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
            </Slider>
          </div>
          <h1 className="mt-5" style={{ "--bsBodyFontSize": "1rem"}}>UNLOCK YOUR POTENTIAL</h1>
          <hr className="star-light" />
          <h2 className="font-weight-light mb-0">
            Share Your Skills, Earn Extra Income!
          </h2>
        </div>
      </header>

      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-1"
      >
        {/* Modal content */}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-2"
      >
        {/* Modal content */}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-3"
      >
        {/* Modal content */}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-4"
      >
        {/* Modal content */}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-5"
      >
        {/* Modal content */}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-6"
      >
        {/* Modal content */}
      </div>

      <ContactForm />
    </div>
  );
}

export default Home;
