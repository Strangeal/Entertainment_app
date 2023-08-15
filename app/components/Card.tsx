import Image from "next/image";
import { useEffect, useState } from "react";
import FetchData from "./FetchData";
import axios from "axios";

type DataProps = {
  movie: any;
  searchQuery: string;
};

const Card = ({ movie, searchQuery }: DataProps) => {
  const [movieId, setMovieId] = useState([]);

  const fetch = async () => {
    const allData = await FetchData("http://localhost:3001/data");
    const filteredData = allData.filter((item: any) => item.id === movie.id);
    if (filteredData.length > 0) {
      setMovieId(filteredData[0]);
    } else {
      console.log("No data found");
    }
  };

  const handleClick = async () => {
    if (movieId) {
      const { isBookmarked, ...movie } = movieId;
      const updateMovie = { ...movie, isBookmarked: !isBookmarked };

      console.log(updateMovie);

      try {
        const response = await axios.put(
          `http://localhost:3001/data/${movieId.id}`,
          updateMovie,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMovieId((prev) => ({
          ...prev,
          isBookmarked: response.data.isBookmarked,
        }));
        // console.log(response.data);
      } catch (error) {
        console.log("Error updating movie:", error);
      }
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {(!searchQuery ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())) && (
        <div className="relative w-fit">
          <img
            className="rounded-lg"
            src={movie.thumbnail.regular.large}
            alt={movie.title}
          />
          {movie.isBookmarked ? (
            <button
              onClick={handleClick}
              className="block bg-prime-dark opacity-60 p-2 rounded-full w-fit absolute top-0 right-0 m-2"
            >
              <img
                className="w-3 h-auto"
                src="/assets/icon-bookmark-full.svg"
                alt="bookmark-icon"
              />
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="block bg-prime-dark opacity-60 p-2 rounded-full w-fit absolute top-0 right-0 m-2"
            >
              <img
                className="w-3 h-auto"
                src="/assets/icon-bookmark-empty.svg"
                alt="bookmark-icon"
              />
            </button>
          )}

          {/* list */}
          <ul className="my-2 text-xs text-prime-gray flex items-center gap-2">
            <li>{movie.year}</li>
            <li className="flex items-center gap-1">
              <span className="block w-1 h-1 bg-prime-gray rounded-full mr-1"></span>
              <Image
                src="/assets/icon-category-movie.svg"
                width={10}
                height={10}
                alt={movie.category}
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
      )}
    </>
  );
};

export default Card;
