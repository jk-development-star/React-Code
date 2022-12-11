import React from "react";

function OwnerDetailModal(props) {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <span>Name: </span>
                {props.lead.owner_name}
              </p>
              <p>
                <span>Email: </span>
                {props.lead.owner_email}
              </p>
              <p>
                <span>Phone: </span>
                {props.lead.owner_phone}
              </p>
              <p>
                <span>Address: </span>
                {props.lead.owner_address}
              </p>
              <p>
                <span>City: </span>
                {props.lead.owner_city}
              </p>
              <p>
                <span>State: </span>
                {props.lead.owner_state}
              </p>
              <p>
                <span>Zip Code: </span>
                {props.lead.owner_zipcode}
              </p>
              <p>
                <span>Country: </span>
                {props.lead.owner_country}
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OwnerDetailModal;
