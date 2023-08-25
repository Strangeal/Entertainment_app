import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import BookmarkBtn from "./BookmarkBtn";
import Link from "next/link";
import PlayBtn from "./PlayBtn";
import { useSession } from "next-auth/react";

type DataProps = {
  movie: MovieProps;
  searchQuery: string;
};

const Card = ({ movie, searchQuery }: DataProps) => {
  const { data: session } = useSession();
  const [bookmarkId, setBookmarkId] = useState<string | null>(null);
  const [bookmarkStatus, setBookmarkStatus] = useState<boolean>(false);

  const fetchAllData = async () => {
    if (session?.user) {
      const movieUrl = `/api/bookmarks/${session?.user?.id}`;
      try {
        const allData = await axios.get(movieUrl);
        if (Array.isArray(allData.data)) {
          const bookmarkForMedia = allData.data.find(
            (item: BookmarkProps) => item.mediaId === movie.id
          );
          setBookmarkId(bookmarkForMedia?.id || null);
          setBookmarkStatus(bookmarkForMedia?.isBookmarked || false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleClick = async () => {
    if (!session?.user) {
      console.log("You're not authorized");
    }
    try {
      if (bookmarkStatus) {
        await axios.delete(`api/bookmarks/${bookmarkId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBookmarkStatus(false);
        fetchAllData();
      } else {
        await axios.post(
          `api/bookmarks`,
          {
            userId: session?.user?.id,
            mediaId: movie.id,
            isBookmarked: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setBookmarkStatus(true);
        fetchAllData();
      }
    } catch (error) {
      console.log("Please sign in");
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
              src={movie.originalPoster}
              alt={movie.title}
            />
            <div className="group w-full h-full absolute top-0 hover:block">
              <BookmarkBtn
                bookmarkStatus={bookmarkStatus}
                handleClick={handleClick}
              />
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
