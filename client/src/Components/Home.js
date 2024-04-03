import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ContactForm from "./ContactForm";
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
    pauseOnHover: true,
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
          <h1 className="mt-5" style={{ "--bsBodyFontSize": "1rem" }}>
            UNLOCK YOUR POTENTIAL
          </h1>
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
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <h2 className="text-uppercase text-secondary mb-0">
                      Woodworking
                    </h2>
                    <hr className="star-dark mb-5" />
                    <img
                      className="img-fluid mb-5"
                      src="assets/img/portfolio/cabin.png"
                      alt="cabin"
                    />
                    <p className="mb-5">
                      Embrace the art of creation with wood. Whether you're a
                      seasoned carpenter or a weekend warrior, showcase your
                      woodworking skills, from crafting bespoke furniture to
                      carving intricate details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer pb-5">
              <a
                className="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss"
                role="button"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-close" />
                &nbsp;Close
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-2"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <h2 className="text-uppercase text-secondary mb-0">
                      Baking
                    </h2>
                    <hr className="star-dark mb-5" />
                    <img
                      className="img-fluid mb-5"
                      src="assets/img/portfolio/cake.png"
                      alt="cake"
                    />
                    <p className="mb-5">
                      Delight with sweet and savory bakes. Share your passion
                      for baking, whether it's whipping up the perfect sourdough
                      or decorating elaborate cakes for special occasions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer pb-5">
              <a
                className="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss"
                role="button"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-close" />
                &nbsp;Close
              </a>
            </div>
          </div>
        </div>{" "}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-3"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <h2 className="text-uppercase text-secondary mb-0">
                      Programming
                    </h2>
                    <hr className="star-dark mb-5" />
                    <img
                      className="img-fluid mb-5"
                      src="assets/img/portfolio/circus.png"
                      alt="circus"
                    />
                    <p className="mb-5">
                      Solve problems with code. Apply your analytical prowess to
                      build apps, websites, and software solutions. Bring your
                      expertise in various programming languages and frameworks
                      to the table.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer pb-5">
              <a
                className="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss"
                role="button"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-close" />
                &nbsp;Close
              </a>
            </div>
          </div>
        </div>{" "}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-4"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <h2 className="text-uppercase text-secondary mb-0">
                      Graphic Design
                    </h2>
                    <hr className="star-dark mb-5" />
                    <img
                      className="img-fluid mb-5"
                      src="assets/img/portfolio/game.png"
                      alt="game"
                    />
                    <p className="mb-5">
                      Visualize ideas with design. Use your creative flair to
                      design stunning graphics, logos, and branding materials
                      that communicate and captivate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer pb-5">
              <a
                className="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss"
                role="button"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-close" />
                &nbsp;Close
              </a>
            </div>
          </div>
        </div>{" "}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-5"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <h2 className="text-uppercase text-secondary mb-0">
                      Gardening
                    </h2>
                    <hr className="star-dark mb-5" />
                    <img
                      className="img-fluid mb-5"
                      src="assets/img/portfolio/safe.png"
                      alt="safe"
                    />
                    <p className="mb-5">
                      Cultivate growth and tranquility. Offer your green thumb
                      services to nurture gardens, from planting seasonal blooms
                      to maintaining lush landscapes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer pb-5">
              <a
                className="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss"
                role="button"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-close" />
                &nbsp;Close
              </a>
            </div>
          </div>
        </div>{" "}
      </div>
      <div
        className="modal text-center"
        role="dialog"
        tabIndex={-1}
        id="portfolio-modal-6"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="container text-center">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <h2 className="text-uppercase text-secondary mb-0">
                      Home Repair
                    </h2>
                    <hr className="star-dark mb-5" />
                    <img
                      className="img-fluid mb-5"
                      src="assets/img/portfolio/submarine.png"
                      alt="submarine"
                    />
                    <p className="mb-5">
                      Fix, repair, and restore. With a toolkit and know-how,
                      help others in the community by mending what's broken and
                      improving homes one project at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer pb-5">
              <a
                className="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss"
                role="button"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-close" />
                &nbsp;Close
              </a>
            </div>
          </div>
        </div>{" "}
      </div>

      <ContactForm />
    </div>
  );
}

export default Home;
