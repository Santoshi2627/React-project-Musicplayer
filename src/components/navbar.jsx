
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebasesetup";
import UserProfile from "./userdetails";
import { PlayerContext } from "../context/playercontext";
import { message } from "antd";

const Navbar = () => {
  const { setIslogin, audioRef, isModalOpen, setIsModalOpen } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logged out successfully!");
      setUser(null);
      setIsModalOpen(false);
      setIslogin(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch (error) {
      message.warning("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold text-white sticky top-0 z-50">
        {/* Back and Forward Buttons */}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            onClick={() => navigate(-1)}
            icon={faArrowLeft}
            className="w-5 bg-orange-500 p-2 rounded-2xl cursor-pointer"
          />
          <FontAwesomeIcon
            onClick={() => navigate(+1)}
            icon={faArrowRight}
            className="w-5 bg-orange-500 p-2 rounded-2xl cursor-pointer"
          />
        </div>

        {/* User Icon */}
        <div className="flex items-center gap-4">
          <div
  className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
  onClick={() => setIsModalOpen(true)}
>
  <FontAwesomeIcon icon={faUser} className="text-xl" />
</div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-3 mt-4 sticky top-16 z-50">
      <p className="bg-orange-400 text-white px-4 py-1 rounded-2xl cursor-pointer" id="nav1"
      onClick={()=>navigate("/display")}>
          All
          {/* {console.log("hello")} */}
        </p>
               <p className="bg-orange-400 text-white px-4 py-1 rounded-2xl cursor-pointer" id="nav2"
        onClick={()=>navigate("/homepagesongs")}>
          Music
          {/* {console.log("hello")} */}
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <UserProfile className="sticky top-2" />
            <h2 className="text-lg font-bold text-gray-800 mb-4">User Details</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

