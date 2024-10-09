import React from "react";
import "./ConfirmationPopup.css";

const ConfirmationPopup = ({ isVisible, onConfirm, onCancel, message }) => {
  // Bootstrap modal ID for targeting
  const modalId = "confirmationModal";

  return (
    <>
      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${isVisible ? "show d-block" : ""}`}
        id={modalId}
        tabIndex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden={!isVisible}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button onClick={onCancel} className="modal_closeBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M19.8203 6.41L18.4103 5L12.8203 10.59L7.23031 5L5.82031 6.41L11.4103 12L5.82031 17.59L7.23031 19L12.8203 13.41L18.4103 19L19.8203 17.59L14.2303 12L19.8203 6.41Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className="modal-header text-center">
              <h5 className="modal-title" id="confirmationModalLabel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="51"
                  height="50"
                  viewBox="0 0 51 50"
                  fill="none"
                >
                  <path
                    d="M34.7092 36.2611L45.8203 25.15M45.8203 25.15L34.7092 14.0389M45.8203 25.15H19.1536M25.8203 36.2611C25.8203 36.9179 25.8203 37.2464 25.7959 37.5309C25.5421 40.4877 23.3644 42.9208 20.4537 43.4995C20.1737 43.5552 19.847 43.5915 19.1944 43.664L16.9246 43.9162C13.5147 44.295 11.8097 44.4845 10.4551 44.051C8.64905 43.4731 7.17457 42.1534 6.40071 40.4222C5.82031 39.1238 5.82031 37.4083 5.82031 33.9773V16.3226C5.82031 12.8917 5.82031 11.1762 6.40071 9.87781C7.17457 8.14661 8.64905 6.82688 10.4551 6.24894C11.8097 5.81547 13.5147 6.00492 16.9246 6.3838L19.1944 6.636C19.8472 6.70854 20.1737 6.74481 20.4537 6.80049C23.3644 7.37922 25.5421 9.8123 25.7959 12.7691C25.8203 13.0536 25.8203 13.382 25.8203 14.0389"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h5>
            </div>
            <div className="modal-body text-center">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className=" whiteOuteLineBtn d-flex align-items-center gap-2"
                onClick={onCancel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <path
                    d="M11.8893 3.74047L11.0668 2.91797L7.80599 6.1788L4.54516 2.91797L3.72266 3.74047L6.98349 7.0013L3.72266 10.2621L4.54516 11.0846L7.80599 7.8238L11.0668 11.0846L11.8893 10.2621L8.62849 7.0013L11.8893 3.74047Z"
                    fill="white"
                  />
                </svg>{" "}
                No
              </button>
              <button
                type="button"
                className="dashboardWhiteBtn d-flex align-items-center gap-2"
                onClick={() => {
                  onConfirm();
                  document.getElementById(modalId).classList.remove("show");
                }}
              >
                Yes{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <path
                    d="M5.45224 9.26151L3.01974 6.82901L2.19141 7.65151L5.45224 10.9123L12.4522 3.91234L11.6297 3.08984L5.45224 9.26151Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {isVisible && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ConfirmationPopup;
