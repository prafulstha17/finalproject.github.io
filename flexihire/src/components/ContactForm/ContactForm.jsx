import React, { useState } from 'react'
import "./ContactForm.css"

function ContactForm() {

  const [formFilled, setFormFilled] = useState(false);

  const[formSubmit, setFormSubmit]= useState(false);


  const[userData,setUserData]= useState(
    {
      Name : "",
     email: "",
      message: "",
      
    }
  )

  let name , value;
  
  const postUserData= (event)=>{
    name = event.target.name;
    value = event.target.value;
    setUserData({...userData, [name]:value})
  }

  //connect to data base
  const submitData = async (event)=>{
    event.preventDefault();
    const { Name,email,message}=userData;
    if (Name && email && message){
      setFormFilled(true);
    }else{
      setFormFilled(false);
    }

    if(Name && email && message ){
      const res = await fetch (
        "https://flexihire-8f227-default-rtdb.firebaseio.com/ContactFormData.json",
        {
          method : "POST",
          Headers : {
            "Contact-Type" : "application/json"
          },
          body: JSON.stringify({
            Name,email,message
          }),
        }

      );
      if(res){
        setUserData({
          Name : "",
    email : "",
    message:"",
        })
      }
      
      setFormSubmit(true);
      
  }
}

  return (
    <>
    <form className="contact-form" >
      <label htmlFor="name">Name</label>
      <input
        id="Name"
        type="text"
        name='Name'
        value={userData.Name}
        onChange={postUserData}
        required
      />
      

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name='email'
        value={userData.email}
        onChange={postUserData}
        required
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name='message'
        value={userData.message}
        onChange={postUserData}
        required
      />

      <button type="submit"  disabled={formFilled} onClick={submitData}>Submit</button>
     
     {/* Bug  - both span are shown in same time*/}
      {formSubmit && <span style={{color:"green"}}> Message Sent</span>}

    </form>
    </>
  )
}

export default ContactForm