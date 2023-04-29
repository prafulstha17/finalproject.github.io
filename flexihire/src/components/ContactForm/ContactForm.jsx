import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formFilled, setFormFilled] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [userData, setUserData] = useState({
    Name: '',
    email: '',
    message: '',
  });

  function addClass() {
    document.body.classList.add("sent");
  }

  const postUserData = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { Name, email, message } = userData;
    if (Name && email && message) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }

    if (Name && email && message) {
      const res = await fetch(
        'https://flexihire-8f227-default-rtdb.firebaseio.com/ContactFormData.json',
        {
          method: 'POST',
          Headers: {
            'Contact-Type': 'application/json',
          },
          body: JSON.stringify({
            Name,
            email,
            message,
          }),
        }
      );
      if (res) {
        setUserData({
          Name: '',
          email: '',
          message: '',
        });
      }

      setFormSubmit(true);
    }
  };

  return (
    <>
      <div className='contact-form'>
        <form>
          <div className="wrapper centered">
            <article className="letter">
              <div className="side">
                <h1>Contact Us</h1>
                <p>
                  <textarea
                    id='message'
                    name='message' placeholder="Your message"
                    value={userData.message}
                    onChange={postUserData}
                    required
                  />
                </p>
              </div>
              <div className="side">
                <p>
                  <input
                    id='Name'
                    type='text'
                    name='Name'
                    placeholder='Your Name'
                    value={userData.Name}
                    onChange={postUserData}
                    required
                  />
                </p>
                <p>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Your Email'
                    value={userData.email}
                    onChange={postUserData}
                    required
                  />
                </p>
                <p>
                  {userData.Name && userData.email && userData.message ? (
                    <button type='submit' id="sendLetter" onClick={submitData}>
                      Submit
                    </button>
                  ) : null}
                </p>
              </div>
            </article>
            <div className="envelope front"></div>
            <div className="envelope back"></div>
          </div>
          <p className="result-message centered">Your message have been received</p>
          {formSubmit && (
            addClass()
          )}
        </form>
      </div>
    </>
  );
}

export default ContactForm;

