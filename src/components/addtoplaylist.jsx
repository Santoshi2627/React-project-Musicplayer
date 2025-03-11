import React from "react";
// import { usePlaylist } from "../context/PlaylistContext";
import { usePlaylist } from '../context/playercontext';

const CreatePlaylistPage = () => {
  const { playlist } = usePlaylist(); // Access playlist from context

  return (
    <div className="p-4">
      <h1 className="text-white font-bold text-2xl mb-4">Your Playlist</h1>
      {playlist.length === 0 ? (
        <p className="text-white">No songs added to the playlist yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {playlist.map((song) => (
            <div key={song.id} className="p-4 bg-gray-800 rounded">
              <img src={song.image} alt={song.title} className="rounded h-[80%] w-[70%]" />
              <h3 className="text-white font-bold text-lg">{song.title}</h3>
              <p className="text-white text-sm">{song.singer || song.artist}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePlaylistPage;
