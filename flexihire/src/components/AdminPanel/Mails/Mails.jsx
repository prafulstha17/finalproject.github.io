// import React, { useEffect, useState } from "react";
// import firebase from "firebase/compact/app";
// //import "firebase/compact/database"

// function Mails() {
//   const [contactFormData, setContactFormData] = useState(null);

//   useEffect(() => {
//     // Fetch data from Firebase Realtime Database
//     const fetchData = async () => {
//       const snapshot = await firebase
//         .database()
//         .ref("ContactFormData")
//         .once("value");
//       const data = snapshot.val();
//       setContactFormData(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {contactFormData ? (
//         <ul>
//           {Object.entries(contactFormData).map(([key, value]) => (
//             <li key={key}>
//               <h3>{value.name}</h3>
//               <p>Email: {value.email}</p>
//               <p>Message: {value.message}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }

// export default Mails;
