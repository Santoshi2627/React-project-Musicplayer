import { useParams,useNavigate } from "react-router-dom";
import  Navbar  from "./navbar";
import { TeluguMovies } from "../songsdata/moviesdata/telugumovies"; 
import { HindiMovies } from "../songsdata/moviesdata/hindimovies";
import { KannadaMovies } from "../songsdata/moviesdata/kannadamovies";
import { TamilMovies } from "../songsdata/moviesdata/tamilmovies";
import { EnglishMovies } from "../songsdata/moviesdata/englishmovies";

// Example AlbumData mapping
const AlbumData = {
  "0": TeluguMovies,
  "1": HindiMovies,
  "2": KannadaMovies,
  "3": TamilMovies,
  "4": EnglishMovies,
};

const Movies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const moviesList = AlbumData[Number(id)];

  if (!moviesList) {
    return <div>Album not found</div>;
  }

  const handleMovieClick = (movie) => {
   
    navigate("/song-details", { state: { selectedMovie: movie } });//naviagting the songdetails with state 
  };

  return (
    <div>
      {/* <Navbar /> */}
      <h1 className="my-5 font-bold text-2xl">{AlbumData.title}</h1>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {moviesList.map((movie) => (
          <div key={movie.id} className="p-4 hover:scale-110 transition duration-1000">
            <img
              src={movie.image}
              alt={movie.movie}
              className="rounded h-[80%] cursor-pointer p-3 transition hover:bg-[#ffffff26]"
              onClick={() => handleMovieClick(movie)} // Handle click event
            />
            <h1 className=" font-bold text-xl ml-5">{movie.movie}</h1>
            <p className=" text-sm bold ml-5">{movie.hero}</p>
            <p className="font-light text-xs ml-5">{movie.director}</p>
            <p className="font-light text-xs ml-5">{movie.heroine}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
