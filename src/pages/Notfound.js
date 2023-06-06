import React from "react";
import zonk from "../assets/404.svg";
import "../css/index.css";

const Notfound = () => {
  return (
    <section className="h-100 w-100 bg-white" id="not-found">
      <div className="empty-4-5 container mx-auto d-flex align-items-center justify-content-center flex-column">
        <img className="main-img img-fluid" src={zonk} alt="main" />

        <div className="text-center w-100">
          <h1 className="title-text">Opss! Something Missing</h1>
          <p className="title-caption">
            The page you're looking for isn't found. We
            <div className="d-sm-block d-none">
              suggest you Back to Homepage.
            </div>
          </p>
          <div className="d-flex justify-content-center">
            <a
              href="/"
              className="btn btn-back d-inline-flex text-white"
              role={"button"}
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notfound;
