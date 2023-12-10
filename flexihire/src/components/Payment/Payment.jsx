import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('mm');
    const [expiryYear, setExpiryYear] = useState('yy');
    const [cvv, setCvv] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    const handleCardNumberChange = (e) => {
        const formattedCardNumber = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        setCardNumber(formattedCardNumber);
    };

    const handleCardHolderChange = (e) => {
        setCardHolder(e.target.value);
    };

    const handleExpiryMonthChange = (e) => {
        setExpiryMonth(e.target.value);
    };

    const handleExpiryYearChange = (e) => {
        setExpiryYear(e.target.value);
    };

    const handleCvvChange = (e) => {
        setCvv(e.target.value.replace(/\D/g, ''));
    };

    const handleCvvMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleCvvMouseLeave = () => {
        setIsFlipped(false);
    };

    const handleCvvFocus = () => {
        setIsFlipped(true);
    };

    const handleCvvBlur = () => {
        setIsFlipped(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitClicked(true);
    };

    return (
        <div className="payment">
            {!isSubmitClicked ? (
                <div className="container">
                    <div className={`card-container ${isFlipped ? 'flipped' : ''}`}>
                        <div className="imagePay">
                            <div className="front">
                                <div className="image">
                                    <img src="/Images/png/chip.png" alt="" />
                                    <img src="/Images/png/visa.png" alt="" />
                                </div>
                                <div className="card-number-box">{cardNumber.padEnd(16, '#')}</div>

                                <div className="flexbox">
                                    <div className="box">
                                        <span>card holder</span>
                                        <div className="card-holder-name">{cardHolder || 'full name'}</div>
                                    </div>
                                    <div className="box">
                                        <span>expires</span>
                                        <div className="expiration">
                                            <span className="exp-month">{expiryMonth}</span>
                                            <span className="exp-year">{expiryYear}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="back">
                            <div className="stripe"></div>
                            <div className="box">
                                <span>cvv</span>
                                <div className="cvv-box">{cvv}</div>
                                <img src="/Images/png/visa.png" alt="" />
                            </div>
                        </div>
                    </div>

                    <form action="">
                        <div className="inputBox">
                            <span>card number</span>
                            <input
                                type="text"
                                maxLength="19"  // Adjusted the maxLength to include spaces
                                className="card-number-input"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="CARD NUMBER"
                            />
                        </div>
                        <div className="inputBox">
                            <span>card holder</span>
                            <input
                                type="text"
                                className="card-holder-input"
                                value={cardHolder}
                                onChange={handleCardHolderChange}
                                placeholder="FULL NAME"
                            />
                        </div>
                        <div className="flexbox">
                            <div className="inputBox">
                                <span>expiration mm</span>
                                <select
                                    name=""
                                    id=""
                                    className="month-input"
                                    value={expiryMonth}
                                    onChange={handleExpiryMonthChange}
                                >
                                    <option value="Month">MONTH</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div className="inputBox">
                                <span>expiration yy</span>
                                <select
                                    name=""
                                    id=""
                                    className="year-input"
                                    value={expiryYear}
                                    onChange={handleExpiryYearChange}
                                >
                                    <option value="Year">YEAR</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                    <option value="2032">2032</option>
                                    <option value="2033">2033</option>
                                </select>
                            </div>
                            <div className="inputBox">
                                <span>cvv</span>
                                <input
                                    type="text"
                                    maxLength="4"
                                    className="cvv-input"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    onMouseEnter={handleCvvMouseEnter}
                                    onMouseLeave={handleCvvMouseLeave}
                                    onFocus={handleCvvFocus}
                                    onBlur={handleCvvBlur}
                                    placeholder="CVV"
                                />
                            </div>
                        </div>
                        <input type="submit" value="submit" className="submit-btn" onClick={handleSubmit} />
                    </form>
                </div>
                ) : (
                <div className="beta-message">
                    <p>This feature is still in beta phase.</p>
                </div>
            )}
        </div>
    );
};

export default Payment;
