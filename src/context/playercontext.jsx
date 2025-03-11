
import { createContext, useState, useRef, useContext } from 'react';
import { Telugu } from '../songsdata/telugualbum';
export const PlayerContext = createContext();

const PlayerProvider = (props) => {
  const [track, setTrack] = useState(Telugu[0]);
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [user, setUser] = useState({ name: "Guest", email: "guest@email.com" }); // User details
 const [islogin, setIslogin] = useState(false)
 const [isModalOpen,setIsModalOpen]=useState(false)
  const addToPlaylist = (song) => {
    if (!playlist.find((item) => item.id === song.id)) {
      setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
    }
  };

  // Function to play a song by its ID
  const playWithId = (id) => {
    setTrack(Telugu[id]); // Set the song with the given ID
  };

  // Functions for previous and next track
  const previous = () => {
    if (track.id > 0) {
      setTrack(Telugu[track.id - 1]);
    }
  };

  const next = () => {
    if (track.id < Telugu.length - 1) {
      setTrack(Telugu[track.id + 1]);
    }
  };

  // Function to update user details
  const updateUser = (userDetails) => {
    setUser(userDetails);
  };

  // Context value to provide to the app
  const contextValue = {
    track,
    setTrack,
    playlist,
    setPlaylist,
    addToPlaylist,
    audioRef,
    playWithId,
    previous,
    next,
    user, // User data
    setUser, // Function to update user
    updateUser,
    islogin,
    setIslogin ,
    isModalOpen,setIsModalOpen
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlayerContext);

export default PlayerProvider;
