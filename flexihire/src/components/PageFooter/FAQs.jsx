import React, { useState } from 'react';
import './FAQs.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = [
        {
            question: "Can we delete our account?",
            answer: "No. Currently we are in beta phase so it cannot be done",
        },
        {
            question: "Can I earn real money from this?",
            answer: "We are in beta phase so all the features are not implemented perfectly.",
        },
        {
            question: "How to search for different users?",
            answer: "In search option there is a dropdown which contains Flexer, select that and type the username you want.",
        },
        {
            question: "How frequently does this get updated?",
            answer: "We are short in resources so the development is slow.",
        },
        {
            question: "Is this the final version?",
            answer: "No we are continuously working on improving the UI and implement new features, so stay tuned.",
        },
        {
            question: "There are no jobs I am searching for.",
            answer: "Our community is very small and there are not many users who might have posted the job specification you wanted.",
        },
        {
            question: "Can my account be banned?",
            answer: "Yes if we get reports or if we suspect something going wrong with your account, then it can be revoked.",
        },
        {
            question: "How to recover my banned account?",
            answer: "Write a mail to us through Contact Us, and we'll check if we have made some error and shortly enable your account.",
        },
        // Add more FAQ items as needed
    ];

    const handleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <main className="cardFAQ">
            <h2 className="titleFAQ">FAQs</h2>

            <div className="acc-container-faq">
                {faqData.map((item, index) => (
                    <div key={index}>
                        <button
                            className={`acc-btn-faq ${openIndex === index ? 'is-open' : ''}`}
                            onClick={() => handleAccordion(index)}
                        >
                            {item.question}
                        </button>
                        <div className={`acc-content-faq ${openIndex === index ? 'is-open' : ''}`}>
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default FAQ;
