/**
 * Footer Component
 *
 * This component renders the navigation bar at the end of the application. It includes the Lumia logo and
 * navigation links.
 *
 * @export
 * @returns {JSX.Element} - The header navigation component.
 */

import React from "react";
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="customFooter"></footer>
    </>
  );
}

export default Footer;
