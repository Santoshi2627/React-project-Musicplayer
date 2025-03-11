import React, { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../context/playercontext";
import { Telugu } from "../songsdata/telugualbum";  // Import your song data
import Navbar from "./navbar";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...item }) => item);
};

const HomepageSongs = () => {
  const { playWithId } = useContext(PlayerContext);
  const [randomSongs, setRandomSongs] = useState([]);

  useEffect(() => {
    const shuffledSongs = shuffleArray(Telugu).slice(0, 10);
    setRandomSongs(shuffledSongs);
  }, []);

  return (
    <>
    <div className="p-5 mt-12" id="navitems">
      <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {randomSongs.map((song) => (
          <div
            key={song.id}
            onClick={() => playWithId(song.id)} // Just set the track
            className="cursor-pointer p-3 transition hover:bg-[#ffffff26]"
          >
            <img
              src={song.image}
              alt={song.title}
              className="w-full h-70 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-lg ">{song.movie}</p>
            <p className="text-sm ">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default HomepageSongs;
