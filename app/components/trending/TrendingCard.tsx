import React from "react";
import Image from "next/image";
import BookmarkBtn from "../BookmarkBtn";
import Link from "next/link";
import PlayBtn from "../PlayBtn";

type PredingMoviesProps = {
  trend: any;
};

const TrendingCard = ({ trend }: PredingMoviesProps) => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <img
        className="rounded-lg bg-opacity-50"
        src={trend.thumbnail.regular.large}
        alt={trend.title}
      />
      <div className="group w-full h-full  absolute bottom-0 hover:block">
        <BookmarkBtn movie={trend} handleClick={handleClick} />
        <div className="absolute bottom-5 left-4 z-10">
          <ul className="my-2 text-xs font-medium text-white/60 flex items-center gap-2">
            <li>{trend.year}</li>
            <li className="flex items-center gap-1">
              <span className="block w-1 h-1 bg-prime-gray rounded-full mr-1"></span>
              {trend.category === "Movie" ? (
                <Image
                  src="/assets/icon-category-movie.svg"
                  width={10}
                  height={10}
                  alt="category-icon"
                />
              ) : (
                <Image
                  src="/assets/icon-category-tv.svg"
                  width={10}
                  height={10}
                  alt="category-icon"
                />
              )}
              {trend.category}
            </li>
            <li className="flex items-center gap-1">
              <span className="block w-1 h-1 bg-prime-gray rounded-full mr-1"></span>
              {trend.rating}
            </li>
          </ul>
          <Link href="/" className="text-white text-lg font-medium">
            {trend.title}
          </Link>
        </div>
        <PlayBtn />
      </div>
    </>
  );
};

export default TrendingCard;
