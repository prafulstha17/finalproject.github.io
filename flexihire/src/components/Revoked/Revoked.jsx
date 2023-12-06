import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from "../ContactForm/ContactForm";
import Disabled from "./Disabled";

const Revoked = () => {
    return (

        <div className="revokedUser">
            <Routes>
                <Route path="/" element={<Disabled />} />
                <Route path="/mailRevoke" element={<ContactForm />} />
            </Routes>
        </div>
    );
}

export default Revoked;
