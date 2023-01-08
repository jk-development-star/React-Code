import React from "react";
const ViewLead = (props) => {
  return (
    <>
      <div id="mySidepanel" className="sidepanel">
        <div>
          <h4>Test</h4>
          <button className="closebtn" onClick={props.close}>
            X
          </button>
          <table
            className="table table-bordered table-style"
            cellPadding="10"
            cellSpacing="0"
            border="0"
          >
            <tbody>
              <tr>
                <td>Name</td>
                <td></td>
              </tr>
              <tr>
                <td>Email</td>
                <td></td>
              </tr>
              <tr>
                <td>Phone</td>
                <td></td>
              </tr>
              <tr>
                <td>Address</td>
                <td></td>
              </tr>
              <tr>
                <td>City</td>
                <td></td>
              </tr>
              <tr>
                <td>State</td>
                <td></td>
              </tr>
              <tr>
                <td>ZipCode</td>
                <td></td>
              </tr>
              <tr>
                <td>Country</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewLead;
