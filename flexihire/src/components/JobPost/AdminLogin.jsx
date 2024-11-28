import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {  doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = email === "flexihirenepal@gmail.com";

      if (isAdmin) {
        navigate("/"); // Admin successfully logged in
      } else {
        setError("Access denied. Admin only.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const signIn = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await addUserToFirestore(user.uid, name, email);
      await updateProfile(user, { displayName: name });

      navigate("/termsCondition");
    } catch (err) {
      setError("An error occurred during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addUserToFirestore = async (userId, displayName, userEmail) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userData = {
        userId,
        displayName,
        email: userEmail,
        appliedAt: serverTimestamp(),
      };

      await setDoc(userDocRef, userData);
      console.log("User added to Firestore successfully!", userData);
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
