import { useState } from 'react';
import './TermsCondition.css';

function TermsCondition() {
    const [isAgreementVisible, setIsAgreementVisible] = useState(true);

    const handleAccept = () => {
        setIsAgreementVisible(false);
        setTimeout(() => {
            window.location.href = '/';
        }, 100);
    };

    return (
        <>
            <section class="tc-page relative" id="tc">
                <div class="tc-overlay overlay-bg"></div>
                <div class="tc-container">
                    <div class="tc-row d-flex align-items-center justify-content-center">
                        <div class="tc-about-content col-lg-12">
                            <h1 class="text-white">
                                Terms and Conditions
                            </h1>
                            <small>Scroll <i class="fa-solid fa-down-long"></i> and accept to continue</small>
                        </div>
                    </div>
                </div>
            </section>
            {isAgreementVisible && (
                <section class="tc-agreement section-gap" id="service">
                    <div class="container">
                        <div className="heading-agreement">
                            <span>
                                Welcome to "FlexiHire", a platform that connects flexers(freelancers) with flexihirer(clients) seeking their services. These Terms and Conditions ("Terms") govern your access to and use of the FlexiHire website and its related services (collectively, the "Services").

                                By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
                            </span>
                        </div>
                        <div className="heading-number">1. User Accounts</div>
                        a. To access and use certain features of the Services, you must register for an account with FlexiHire ("Account").
                        b. You agree to provide accurate, current, and complete information during the registration process and to update such information as necessary to keep it accurate, current, and complete.
                        c. You are solely responsible for safeguarding your Account login information and for any activity that occurs under your Account.
                        d. FlexiHire reserves the right to suspend or terminate your Account at any time for any reason, including but not limited to violations of these Terms.

                        <div className="heading-number">2. User Content</div>
                        a. You may submit content, including but not limited to text, images, and video, to the Services ("User Content").
                        b. You retain all rights in, and are solely responsible for, the User Content you submit to the Services.
                        c. You hereby grant to FlexiHire a non-exclusive, transferable, sublicensable, royalty-free, worldwide license to use, copy, modify, create derivative works based on, distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels now known or hereafter devised (including in connection with the Services and FlexiHire's business and on third-party sites and services), without further notice to or consent from you, and without the requirement of payment to you or any other person or entity.
                        d. You represent and warrant that you have all rights necessary to grant the licenses granted in this Section 2, and that your User Content, and your provision of your User Content to the Services, complies with all applicable laws, rules, and regulations.

                        <div className="heading-number">3. Prohibited Conduct</div>
                        a. You may not access or use the Services for any purpose other than that for which FlexiHire makes them available.
                        b. You may not use the Services to:
                        i. violate any applicable law, rule, or regulation;
                        ii. infringe any intellectual property or other right of any person or entity;
                        iii. transmit or upload any material that is defamatory, obscene, threatening, abusive, harassing, or otherwise objectionable;
                        iv. engage in any fraudulent or misleading activity;
                        v. interfere with or disrupt the Services or servers or networks connected to the Services, or disobey any requirements, procedures, policies, or regulations of networks connected to the Services;
                        vi. attempt to gain unauthorized access to any portion of the Services or any other accounts, computer systems, or networks connected to the Services, whether through hacking, password mining, or any other means.

                        <div className="heading-number">4. Payment and Fees</div>
                        a. Clients are required to pay the agreed-upon amount for the freelancer's services through the payment platform integrated into the Services.
                        b. FlexiHire may deduct a commission from the payment made by the client to the freelancer, which will be disclosed to the client before the payment is made.
                        c. The freelancer will receive payment from FlexiHire after the client has made payment for the services and FlexiHire has confirmed receipt of payment.
                        d. Freelancers are responsible for paying any taxes owed on the income earned through the Services.

                        <div className="heading-number">5. Proprietary Rights</div>
                        FlexiHire and its content, including but not limited to text, graphics, logos, images, and software, are the property of FlexiHire or its licensors and are protected by copyright, trademark, and other intellectual property laws. Users agree not to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from or through FlexiHire without the prior written consent of FlexiHire.

                        <div className="heading-number">6. User Content</div>
                        Users of FlexiHire may post, upload, publish, submit, or transmit content, including but not limited to text, graphics, images, and videos. Users retain ownership of their content but grant FlexiHire a worldwide, non-exclusive, transferable, sub-licensable, royalty-free license to use, copy, modify, create derivative works based on, distribute, publicly display, publicly perform, and otherwise exploit in any manner such content in all formats and distribution channels now known or hereafter devised (including in connection with FlexiHire and FlexiHire's business and on third-party sites and services), without further notice to or consent from the user, and without the requirement of payment to the user or any other person or entity.

                        <div className="heading-number">7. Indemnification</div>
                        Users agree to indemnify and hold harmless FlexiHire and its affiliates, officers, directors, employees, and agents from any and all claims, damages, losses, liabilities, actions, judgments, costs, and expenses (including reasonable attorneys' fees) arising out of or in connection with the user's use of FlexiHire, including but not limited to the user's violation of these terms and conditions, any content posted by the user, and any activity related to the user's account.

                        <div className="heading-number">8. Limitation of Liability</div>
                        FlexiHire and its affiliates, officers, directors, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with the user's use of FlexiHire, even if FlexiHire has been advised of the possibility of such damages. FlexiHire's total liability to the user for all claims arising out of or in connection with the user's use of FlexiHire will not exceed the amount paid by the user, if any, to FlexiHire during the six-month period prior to the claim.

                        <div className="heading-number">9. Termination</div>
                        FlexiHire may terminate or suspend the user's account at any time and without prior notice for any reason, including but not limited to the user's violation of these terms and conditions. Upon termination, the user's right to use FlexiHire will immediately cease, and the user must immediately cease all use of FlexiHire and destroy all copies of any content obtained from FlexiHire.
                    </div>
                </section>)}
            {!isAgreementVisible && (
                <section class="tc-agreement section-gap hidden" id="service">
                    <div class="container">
                        ...
                    </div>
                </section>
            )}
            <section class="tc-accept-area">
                <div class="container-nav">
                    <small><bold>(I don't think you have read it all, though assuming you did.)</bold><br />By clicking 'Accept' you are agreeing to our terms and conditions.</small>
                    <button type='submit' class="accept" onClick={handleAccept}>Accept</button>
                </div>
            </section>
        </>
    );

}

export default TermsCondition;