import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import ContactForm from "../ContactForm/ContactForm";
import MailReceived from "../ContactForm/MailReceived";
import Disabled from "./Disabled";

const Revoked = () => {
    return (

        <div className="revokedUser">
            <Routes>
                <Route path="/" element={<Disabled />} />
                <Route path="/mailReceived" element={<MailReceived />} />
                <Route path="/mailRevoke" element={<ContactForm />} />
            </Routes>
        </div>
    );
}

export default Revoked;
