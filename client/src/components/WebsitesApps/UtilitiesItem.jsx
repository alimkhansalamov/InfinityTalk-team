import React from 'react';
import cl from './UtilitiesItem.module.css';
const UtilitiesItem = ({
  utilityImage,
  utilityTitle,
  utilityCategory,
  utilityLink,
}) => {
  return (
    <div
      className={`card col-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 m-3 ${cl.cardShadow} align-content-between justify-content-center`}
    >
      <a href={utilityLink}>
        <img src={utilityImage} className="card-img-top" alt="Image" />
      </a>
      <div className=" d-flex flex-wrap card-body ">
        <div>
          <h5 className="card-title">{utilityTitle}</h5>
        </div>

        <div className="d-flex flex-fill justify-content-around align-items-center">
          <h3 className="card-text align-items-center">{utilityCategory}</h3>
          <a href={utilityLink} className={`btn btn-danger `} target="_blank">
            Open the link
          </a>
        </div>
      </div>
    </div>
  );
};

export default UtilitiesItem;
