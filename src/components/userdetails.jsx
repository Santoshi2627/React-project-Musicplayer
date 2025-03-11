
import React, { useContext } from "react";
import { PlayerContext } from "../context/playercontext";

const UserProfile = ({ user }) => {
  const { setIsLogin } = useContext(PlayerContext);

  if (!user) return null; // Prevent errors if user is null

  return (
    <div>
      <p className="text-sm text-gray-600">Logged in as:</p>
      {user.isGuest ? (
        <p className="text-sm font-bold text-gray-800">Guest</p>
      ) : (
        <>
          <p className="text-sm font-bold text-gray-800">{user.username || "No Name Provided"}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;
