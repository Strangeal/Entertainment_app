import React from "react";
import Image from "next/image";

type PredingMoviesProps = {
  trend: any;
};

const TrendingCard = ({ trend }: PredingMoviesProps) => {
  return (
    <div>
      <div className="relative w-fit">
        <img
          className="rounded-lg bg-opacity-50"
          src={trend.thumbnail.regular.large}
          alt={trend.title}
        />
        <button className="block bg-prime-dark opacity-60 p-2 rounded-full w-fit absolute top-0 right-0 m-2">
          {trend.isBookmarked ? (
            <img
              className="w-3 h-auto"
              src="/assets/icon-bookmark-full.svg"
              alt="bookmark-icon"
            />
          ) : (
            <img
              className="w-3 h-auto"
              src="/assets/icon-bookmark-empty.svg"
              alt="bookmark-icon"
            />
          )}
        </button>

        {/* absolute bottom-20 left-10 w-fit bg-black/10 */}
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
              {}
            </li>
          </ul>
          <h4 className="text-white text-lg font-medium">{trend.title}</h4>
        </div>

        {/* hover */}
        {/* <div className="w-full h-full bg-black/40 absolute bottom-0">
          <button className="bg-white/50 rounded-3xl flex items-center p-2 w-28 font-medium text-lg relative top-[50%] left-[30%]">
            <Image
              className="mr-5"
              src="/assets/icon-play.svg"
              width={30}
              height={30}
              alt=""
            />
            Play
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TrendingCard;
