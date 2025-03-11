import React, { useEffect, useState } from 'react';

const MusicFetcher = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const accessToken = 'BQDea5QSKsvpSRHn-P-8pgtpJqdfxvreVQxaAsbIEaSlEzp_p7Y5h7jGQV8YxBoAPR_5AFQ7a-5eNNrI-hbaC0fjq1TToNzbrhqf2i8vn7zbO3qUJ-U';

  useEffect(() => {
    // Fetching songs in specific languages (Telugu, Tamil, Hindi, Kannada)
    fetch('https://api.spotify.com/v1/search?q=telugu&type=track&limit=5', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tracks && data.tracks.items) {
          setSongs(data.tracks.items); // Set the songs data
        } else {
          console.error('Error: No items found in response for songs');
        }
      })
      .catch((error) => console.error('Error fetching songs:', error));

    // Fetching albums in specific languages (Telugu, Tamil, Hindi, Kannada)
    fetch('https://api.spotify.com/v1/search?q=telugu&type=album&limit=5', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.albums && data.albums.items) {
          setAlbums(data.albums.items); // Set the albums data
        } else {
          console.error('Error: No items found in response for albums');
        }
      })
      .catch((error) => console.error('Error fetching albums:', error));
  }, [accessToken]);

  return (
    <div>
      <h1>Telugu Songs</h1>
      <ul>
        {songs && songs.length === 0 ? (
          <p>No Telugu songs available</p>
        ) : (
          songs.map((song, index) => (
            <li key={index}>
              <strong>{song.name}</strong> by {song.artists?.map((artist) => artist.name).join(', ')}
              <br />
              {song.preview_url ? (
                <audio controls>
                  <source src={song.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p>No audio preview available</p> // Fallback message when no preview is available
              )}
            </li>
          ))
        )}
      </ul>

      <h1>Telugu Albums</h1>
      <ul>
        {albums && albums.length === 0 ? (
          <p>No Telugu albums available</p>
        ) : (
          albums.map((album, index) => (
            <li key={index}>
              <strong>{album.name}</strong> by {album.artists?.map((artist) => artist.name).join(', ')}
              <br />
              {album.preview_url ? (
                <audio controls>
                  <source src={album.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p>No audio preview available</p> // Fallback message when no preview is available
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MusicFetcher;
