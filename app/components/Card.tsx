import Image from "next/image";

type DataProps = {
  movie: any;
};

const Card = ({ movie }: DataProps) => {
  return (
    <div className="relative w-fit">
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
  );
};

export default Card;
