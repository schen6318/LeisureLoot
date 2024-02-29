import React from "react";

function Footer() {
  return (
    <div>
      <footer className="text-center footer">
        <div className="container">
          <div className="row">
            <div className="col col-sm-12 col-md-6">
              <h4 className="text-uppercase mb-4">support us</h4>
              <p className="lead mb-0">
                <span>
                  If you're inclined to aid our growth and bolster our mission,
                  we invite you to make a donation through the 'Support' option
                  in the main menu.
                </span>
              </p>
              <p className="lead mb-0" />
            </div>
            <div className="col col-sm-12 col-md-6">
              <h4 className="text-uppercase mb-4">leisure loot</h4>
              <p className="lead mb-0">
                <span>
                  It's a community-driven platform connecting people to fulfill
                  local needs and opportunities for earning additional income.
                </span>
              </p>
              <p className="lead mb-0" />
            </div>
          </div>
        </div>
      </footer>
      <div className="text-center text-white copyright py-4">
        <div className="container">
          <small>Copyright ©&nbsp;LeisureLoot 2024</small>
        </div>
      </div>
      <div className="d-lg-none scroll-to-top position-fixed rounded">
        <a className="text-center d-block rounded text-white" href="#page-top">
          <i className="fa fa-chevron-up" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
