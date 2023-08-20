import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import BookmarkBtn from "./BookmarkBtn";
import Link from "next/link";
import PlayBtn from "./PlayBtn";

type DataProps = {
  movie: any;
  searchQuery: string;
  allMovies: MovieProps[] | null;
  setAllMovies: (item: MovieProps[] | null) => void;
};

const Card = ({ movie, searchQuery, allMovies, setAllMovies }: DataProps) => {
  const [movieBooked, setMovieBooked] = useState([]);

  const fetchAllData = async () => {
    try {
      const movieUrl = "http://localhost:3001/data";
      const allData = await axios.get(movieUrl);
      setAllMovies(allData.data);
    } catch (error) {
      throw error;
    }
  };

  const handleClick = async () => {
    const filterClick = allMovies?.find(
      (item: MovieProps) => item.id === movie.id
    );
    console.log("Clicked:", filterClick);

    if (filterClick) {
      const { isBookmarked, ...movieData } = filterClick;
      const updateMovie = { ...movieData, isBookmarked: !isBookmarked };

      try {
        const response = await axios.put(
          `http://localhost:3001/data/${filterClick.id}`,
          updateMovie,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMovieBooked((prev) => ({
          ...prev,
          isBookmarked: response.data.isBookmarked,
        }));

        fetchAllData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {(!searchQuery ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())) && (
        <div className="relative w-fit">
          <div className="relative">
            <img
              className="rounded-lg"
              src={movie.thumbnail?.regular.large}
              alt={movie.title}
            />
            <div className="group w-full h-full absolute top-0 hover:block">
              <BookmarkBtn movie={movie} handleClick={handleClick} />
              <PlayBtn />
            </div>
          </div>

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

          <Link href="/" className="text-white text-base">
            {movie.title}
          </Link>
        </div>
      )}
    </>
  );
};

export default Card;
