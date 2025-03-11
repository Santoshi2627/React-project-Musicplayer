import React from "react";
import { useParams } from "react-router-dom";
import {Albums} from "../songsdata/albums";

 const DisplayAlbum=()=>{
    const {id}=useParams()

    const albumData=Albums[id]
 return (
   <>
     <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
       <img
         src={albumData.image}
         alt={albumData.title}
         className="h-[250px] w-[250px]"
       />
       <div className="flex flex-col">
         <p>Playlist</p>
         <h2 className="text-5xl font-bold mb-4 md:text-7xl">
           {albumData.title}
         </h2>
         <h1>{albumData.description}</h1>
         <p className="mt-1">
           <img
             className="inline-block w-9"
             src="https://static.vecteezy.com/system/resources/previews/001/541/067/non_2x/music-and-sound-logo-design-vector.jpg"
             alt="Music symbol"
           />
           <b className="text-whi">Music-player</b>
           <span className="text-gray-300">•</span>
           1,432,345 likes
           <span className="text-gray-300">•</span>
           <b className="text-white">20 songs</b>
           <span className="text-gray-300">•about 1hr 30min</span>
           {/* about 1hr 30min */}
         </p>
       </div>
     </div>
   </>
 );
}
export default DisplayAlbum;
    