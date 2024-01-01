// Import necessary dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";
import ContactForm from "../ContactForm/ContactForm";
import MailReceived from "../ContactForm/MailReceived";
import Disabled from "./Disabled";

// Define the Revoked component
const Revoked = () => {
  return (
    <div className="revokedUser">
      {console.log("Running")}
      {/* Wrap the Routes around the Route components */}
      <Routes>
        <Route path="/" element={<Disabled />} />
        <Route path="/mailReceived" element={<MailReceived />} />
        <Route path="/mailRevoke" element={<ContactForm />} />
      </Routes>
    </div>
  );
};

// Export the component
export default Revoked;
