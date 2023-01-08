import React from "react";

const OwnerDetailModal = (props) => {
  return (
    <>
      <div
        className="modal bd-example-modal-lg"
        id={`exampleModal${props.lead.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}-{props.lead.lead_id}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h4>Lead Information</h4>
              <table
                className="table table-bordered table-style"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  <tr>
                    <td>Lead ID</td>
                    <td>{props.lead.lead_id}</td>
                  </tr>
                  <tr>
                    <td>Lead Budget</td>
                    <td>{props.lead.lead_budget}</td>
                  </tr>
                  <tr>
                    <td>Lead Status</td>
                    <td>
                      {props.lead.lead_status === "1" ? (
                        <p className="btn btn-success">Active</p>
                      ) : (
                        ""
                      )}
                      {props.lead.lead_status === "2" ? (
                        <p className="btn btn-info">Follow Up</p>
                      ) : (
                        ""
                      )}
                      {props.lead.lead_status === "0" ? (
                        <p className="btn btn-danger">In-Active</p>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Lead Covered Area</td>
                    <td>{props.lead.covered_aread}</td>
                  </tr>
                </tbody>
              </table>
              <h4>Owner Details</h4>
              <table
                className="table table-bordered table-style"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{props.lead.owner_name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{props.lead.owner_email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{props.lead.owner_phone}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{props.lead.owner_address}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{props.lead.owner_city}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{props.lead.owner_state}</td>
                  </tr>
                  <tr>
                    <td>ZipCode</td>
                    <td>{props.lead.owner_zipcode}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{props.lead.owner_country}</td>
                  </tr>
                </tbody>
              </table>
              <h4>Lead Description</h4>
              <table
                className="table table-bordered table-style"
                cellPadding="10"
                cellSpacing="0"
                border="0"
              >
                <tbody>
                  <tr>
                    <td>Lead Description</td>
                    <td>{props.lead.description}</td>
                  </tr>
                  <tr>
                    <td>Lead Remark</td>
                    <td>{props.lead.lead_remark_followup}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OwnerDetailModal;
