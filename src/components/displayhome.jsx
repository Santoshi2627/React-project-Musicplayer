import React from "react";
import Navbar from "./navbar"
import { Albums} from "../songsdata/albums";
import AlbumItem from "./albumitem";
import HomepageSongs from "./homepagesongs";

function DisplayHome(){
    return(
        <div>
         {/* <Navbar/> */}
         <div className="mb-6">
            <h1 className="my-5 mt-8 font-bold text-2xl" id="albums">Featured charts</h1>
            <div className="flex overflow-auto">
            {Albums.map((AlbumsItem,index)=>{
             return(<AlbumItem key={index} title={AlbumsItem.title} id={AlbumsItem.id} image={AlbumsItem.image} desc={AlbumsItem.description} year={AlbumsItem.year}/>)
            })}
            </div>
         </div>
         <div className="mt-0">
            <h1 className="mt-8 font-bold text-2xl" id="navitems">Today's biggest Hits</h1>
            <div className="flex overflow-auto">
             <HomepageSongs/>
            </div>
            </div>
        </div>
        
    )
}
export default DisplayHome;