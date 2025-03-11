// import React, { useContext, useState,useEffect } from "react";
// import Sidebar from "./components/sidebar";
// import Player from "./components/player";
// import Display from "./components/display";
// import { PlayerContext } from "./context/playercontext";
// // import {useUserStore} from "./"
// import "./myapp.css";
// // import { onAuthStateChanged,auth } from "./firebasesetup";
// import { onAuthStateChanged } from "firebase/auth"; 
// import { auth } from "./components/firebasesetup"; 
// import LoginForm from "./components/login";
// import UserDetails from './components/userdetails';
// import Navbar from "./components/navbar"
// // import Form from "./Form";

// const App = () => {
//   const { audioRef, track } = useContext(PlayerContext);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [user, setUser] = useState(null);
//   // const { currentUser, isLoading, fetchUserInfo } = useUserStore();

//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unSub(); // Cleanup subscription
//   }, []);
//   // const [user, setUser] = useState({ username: "", email: "" }); // Initialize with default values

//   // const handleLogin = (isLoggedIn, userData = {}) => {
//   //   if (isLoggedIn) {
//   //     setUser(userData); // Store user data if login/signup is successful
//   //   } else {
//   //     setUser(null); // Reset user data if logout or error
//   //   }
//   // };

//   const handleLogin = (status, userData) => {
//     setIsLoggedIn(status);
//     setUser(userData);
//   };

//   const handlePlayClick = () => {
//     console.log("handle play button triggerd")
//     if (!isLoggedIn) {
//       setShowLogin(true); // Show login form if user is not logged in
//     }
//   };

//   return (
//     <div className="h-screen bg-black mainDiv w-[100%]">
//       {/* {showLogin && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
//           <Form onLogin={handleLogin} />
//         </div>
//       )} */}
       
//       {/* {showLogin ? (
//         <LoginForm onLogin={handleLogin} />
//       ) : (
//        ""
//       )} */}
//       <div className="h-[100%] flex ">
//         <Sidebar />
//         <Display />
//       </div>
//       <Player isLoggedIn={isLoggedIn} onPlayClick={handlePlayClick} />
//       <audio ref={audioRef} src={track.audio} preload="auto"></audio>
//     </div>
//   );
// };

// export default App;
import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Player from "./components/player";
import Display from "./components/display";
import { PlayerContext } from "./context/playercontext";
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "./components/firebasesetup"; 
import LoginForm from "./components/login"; // Ensure this is correctly exported
import { useUserStore } from "./components/userstore";
const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false); // Define state for collapse

  const { currentUser, fetchUserInfo, logoutUser } = useUserStore();
  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => unSub(); // Cleanup subscription
  // }, []);
  useEffect(() => {
    logoutUser(); // Clear user state on refresh
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        fetchUserInfo(user.uid); // Fetch user details if available
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unSub(); // Cleanup subscription
  }, []);

  const handleLogin = (status, userData) => {
    setIsLoggedIn(status);
    setUser(userData);
  };

  const handlePlayClick = () => {
    if (!isLoggedIn) {
      setShowLogin(true); // Show login form if user is not logged in
    }
  };

  return (
    <div className="h-screen bg-black mainDiv w-[100%]">
      {showLogin && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <LoginForm onLogin={handleLogin} /> {/* Ensure LoginForm is defined */}
        </div>
      )}
      <div className="h-[100%] flex ">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <Display />
      </div>
      <Player isLoggedIn={isLoggedIn} onPlayClick={handlePlayClick} />
      <audio ref={audioRef} src={track?.audio} preload="auto"></audio> {/* Use optional chaining */}
    </div>
  );
};

export default App;
