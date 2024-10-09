import React from "react";

function ComingSoon({ pageHeading }) {
  return (
    <>
      <div className="innerContainer">
        {/* Centered text section */}
        <div className="text-center landingText">
          {/* Site name */}
          <h4
            data-testid="pageHeading"
            className="subH4"
            style={{ marginBottom: "11px" }}
          >
            {pageHeading}
          </h4>
          {/* Subheading with gradient styling */}
          <h2 className="mainH2 gradientHeading">Coming Soon</h2>
        </div>
      </div>
    </>
  );
}

export default ComingSoon;
