
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { PlayerContext } from "../context/playercontext"; // Import the PlayerContext
// import Navbar  from "./navbar";
// import "./songdetailsstyle.css"

const SongDetails = () => {
  const location = useLocation();
  const { selectedMovie } = location.state || {};
  const { setTrack} = useContext(PlayerContext); // Access playlist and setPlaylist

  if (!selectedMovie || !selectedMovie.songs) {
    return <div>No song details available.</div>;
  }

  const handleSongClick = (song) => {
    setTrack(song); // Set the selected song in the PlayerContext
  };

  // const handleAddPlaylist = (song) => {
  //   if (!playlist.find((item) => item.id === song.id)) {
  //     setPlaylist([...playlist, song]); // Update the playlist in context
  //   }
  // };

  return (
    <div>
      {/* <Navbar /> */}
      <center>
        <h1 className="font-bold text-2xl mt-3">{selectedMovie.movie} Songs</h1>
      </center>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:w-[100%] md:pl-5">
        {selectedMovie.songs.map((song) => (
          <div
            key={song.id}
            className="p-3 cursor-pointer ml-5 "
            onClick={() => handleSongClick(song)}
          >
            <img src={song.image} alt={song.title} className="rounded h-[80%] w-[100%] md:h-[70%] flex flex-col flex-grow" />
            <div className="pl-20 md:pl-13">
            <h3 className=" font-bold text-lg ml-15">{song.title}</h3>
            <p className=" text-sm ">{song.singer || song.artist}</p>
            <p className="font-light text-xs ml-15">{song.description}</p>
           
           
                       </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongDetails;
