import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import BookmarkBtn from "./BookmarkBtn";
import Link from "next/link";
import PlayBtn from "./PlayBtn";
import useFetchFilter from "./fetch & filters/useFetchFilter";

type DataProps = {
  movie: any;
  searchQuery: string;
};

const Card = ({ movie, searchQuery }: DataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movieBooked, setMovieBooked] = useState([]);

  // const fetchData = async () => {
  //   const allData = await FetchData("http://localhost:3001/data");
  //   const filteredData = allData.filter((item: any) => item.id === movie.id);
  //   if (filteredData.length > 0) {
  //     setMovieId(filteredData[0]);
  //   } else {
  //     console.log("No data found");
  //   }
  // };

  const filterMovieId = (item: any) => item.id === movie.id;
  const movieId = useFetchFilter({ filterData: filterMovieId, setIsLoading });

  const handleClick = async () => {
    if (movieId.length > 0) {
      const { isBookmarked, ...movieData } = movieId[0];
      const updateMovie = { ...movieData, isBookmarked: !isBookmarked };

      try {
        const response = await axios.put(
          `http://localhost:3001/data/${movieId[0].id}`,
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
        console.log("Update Success:", response.data);
      } catch (error) {
        console.log("Error updating movie:", error);
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
