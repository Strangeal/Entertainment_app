"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FetchData from "../../components/FetchData";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [img, setImg] = useState(window.innerWidth);

  useEffect(() => {
    const movieUrl = "/data.json";
    const fetchMovies = async () => {
      const allData = await FetchData(movieUrl);
      const movieData = allData.filter(
        (item: any) => item.category === "Movie"
      );
      console.log(movieData);
      setMovies(movieData);
    };
    fetchMovies();
  }, []);

  return (
    <>
      {movies.map((movie: any, index) => (
        <div key={index} className="relative w-fit">
          <img
            className="rounded-lg"
            src={movie.thumbnail.regular.large}
            alt={movie.title}
          />
          <button className="block bg-prime-dark opacity-60 p-2 rounded-full w-fit absolute top-0 right-0 m-2">
            {movie.isBookmarked ? (
              <img
                className="w-3 h-auto"
                src="/assets/icon-bookmark-empty.svg"
                alt="bookmark-icon"
              />
            ) : (
              <img
                className="w-3 h-auto"
                src="/assets/icon-bookmark-full.svg"
                alt="bookmark-icon"
              />
            )}
          </button>

          {/* list */}
          <ul className="my-2 text-xs text-prime-gray flex items-center gap-2">
            <li>{movie.year}</li>
            <li className="flex items-center gap-1">
              <span className="block w-1 h-1 bg-prime-gray rounded-full mr-1"></span>
              <Image
                src="/assets/icon-category-movie.svg"
                width={10}
                height={10}
                alt=""
              />
              {movie.category}
            </li>
            <li className="flex items-center gap-1">
              <span className="block w-1 h-1 bg-prime-gray rounded-full mr-1"></span>
              {movie.rating}
            </li>
          </ul>
          {/* title */}
          <h4 className="text-white text-base">{movie.title}</h4>
        </div>
      ))}
    </>
  );
};

export default Movies;
