import React from 'react';
import './MailReceived.css'; // Don't forget to create and import the corresponding CSS file

const MailReceived = () => {
  return (
    <div className="main-container" style={{ maxWidth: '1300px' }}>
      <div className="cloud">
        <div className="header">
          <div className="header__moon"></div>
          <div className="header__sub-title">
            Thank you for the message, we'll review your message soon.
            <br />
          </div>
          <div className="header__title">BACK TO EARTH</div>
        </div>
        <div className="x3 cloud__front"></div>
        <div className="x2 cloud__back"></div>
        <div className="snake"></div>
        <div className="x1 cloud__main"></div>
      </div>
      <div>
        <div className="light-stripes"></div>
        <div className="space"></div>
        <div className="stars"></div>
        <div className="blue-shadow"></div>
        <div className="ground">
          <div className="first-part">
            <div className="first-hill"></div>
            <div className="first-trees"></div>
            <div className="mountain"></div>
          </div>
          <div className="last-part">
            <div className="last-hill">
              <div className="house">
                <div className="larg-bubble"></div>
                <div className="small-bubble"></div>
              </div>
              <div className="balloon"></div>
            </div>
            <div className="last-trees"></div>
            <div className="yellow-lighting"></div>
          </div>
          <div className="grace"></div>
        </div>
      </div>
    </div>
  );
};

export default MailReceived;
