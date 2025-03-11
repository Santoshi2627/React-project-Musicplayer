
import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { PlayerContext } from "../context/playercontext";
import LoginForm from "./login";
import { useUserStore } from "./userstore";

const Player = ({ onPlayClick, isLoggedIn }) => {
  const { track, previous, next, islogin } = useContext(PlayerContext);
  const audioRef = useRef(new Audio(track.audio));
  const [isModalOpen, setModalOpen] = useState(false);
  const { currentUser } = useUserStore();
  console.log(currentUser);

  const handleAudioPlay = () => {
    if (!islogin) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setModalOpen(true);
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isLoggedIn]);

  return (
    <div className="relative">
      {isModalOpen && !islogin && (
        <div className="fixed bottom-10 left-0 w-full h-full flex justify-center items-center  bg-opacity-50 z-20">
          <div className="relative z-30">
            <LoginForm />
            <button
              className="absolute z-40 top-0 right-5 ml-[7%] mb-[70%] p-2 bg-white text-black  hover:bg-orange-600 hover:text-gray-500"
              onClick={(e) =>{
                e.stopPropagation();
                // alert("button clicked")
                 setModalOpen(false)}}
            >
              X
            </button>
          

          </div>
        </div>
      )}

      {/* Fixed Player Controls */}
      <div className="fixed bottom-0 left-0 w-full h-[16%] bg-white flex flex-col sm:flex-row justify-evenly items-center text-black z-10">
        <div className="lg:flex items-center gap-2">
          <img className="hidden sm:block w-20 h-auto" src={track.image} alt={track.title} />
          <div>
            <p className="lg:flex font-bold text-lg sm:flex-row ">{track.movie}</p>
            <p className="lg:flex font-semibold">{track.title}</p>
          </div>
        </div>
        <div className="lg:flex flex-col items-center">
          <div className="flex gap-4 sm:flex-row">
            <FontAwesomeIcon icon={faBackward} onClick={previous} className="mt-5" />
            <audio
              src={track.audio}
              controls
              ref={audioRef}
              onPlay={handleAudioPlay}
            />
            <FontAwesomeIcon
              icon={faForward}
              onClick={next}
              className="mt-5 text-black cursor-pointer hover:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
