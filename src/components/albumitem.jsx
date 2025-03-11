import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ id, image, title, desc }) => {

  console.log(id, image, title, desc)
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="w-full mt-6 sm:w-full">
        <div
          onClick={() => {
            navigate(`/albums/${id}`);
          }}
          className="min-w-[300px]  p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] hover:shadow-lg hover:shadow-gray-500 transition-shadow duration-200 "
        >
          <img
            className="rounded  h-[350px] hover:scale-110 transition duration-1000"
            src={image}
            alt={title}
          />
          <p className=" text-lg mt-2 bold">{title}</p>
          <p className="font-light text-sm w-full max-w-sm">{desc}</p>
        </div>
      </div>
    </>
  );
};

export default AlbumItem;
