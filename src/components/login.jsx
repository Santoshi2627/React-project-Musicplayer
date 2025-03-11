
import React, { useState, useContext } from "react";
import { auth, database } from "./firebasesetup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { PlayerContext } from "../context/playercontext";
import { message } from "antd";


const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setIslogin, setIsModalOpen } = useContext(PlayerContext); // Ensure you have setIsModalOpen in context
  
  const validateFields = () => {
    const newErrors = {};
    if (isSignup && !username.trim()) newErrors.username = "Please enter a username";
    if (!email.trim()) newErrors.email = "Please enter an email";
    if (!password.trim()) newErrors.password = "Please enter a password";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(database, "users", user.uid), { username, email });
        message.warning("Signup successful! Please login.");
        setIsSignup(false);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(database, "users", user.uid));
        if (userDoc.exists()) {
          setIslogin(true);
          message.success("Login successful!");
          setIsModalOpen(true); // Open modal on successful login
        } else {
          message.warning("User data not found. Please contact support.");
        }
      }
    } catch (error) {
      setErrors({ auth: error.message });
    }
  };

  const handleGuestLogin = async () => {
    setIsSignup(true);
    setIslogin(true);
    message.success("Logged in as guest. Now you can play your song");
  
    setIsModalOpen(true); // Open modal for guest login
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <form onSubmit={handleAuth} className="bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-6 text-center">{isSignup ? "Signup" : "Login"}</h2>

        {isSignup && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full" />
            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
          {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
        </div>

        {errors.auth && <p className="text-red-500 text-xs text-center">{errors.auth}</p>}

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2">
          {isSignup ? "Signup" : "Login"}
        </button>

        <button type="button" onClick={handleGuestLogin} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mb-2">
          Guest Login
        </button>

        <div className="mt-4 text-center">
          {isSignup ? (
            <p>Already have an account? <button type="button" onClick={() => setIsSignup(false)} className="text-blue-500 hover:underline">Login here</button></p>
          ) : (
            <p>Don't have an account? <button type="button" onClick={() => setIsSignup(true)} className="text-blue-500 hover:underline">Signup here</button></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
