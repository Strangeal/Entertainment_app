import TrendingCard from "./TrendingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import FetchData from "../fetch & filters/FetchData";

const Trending = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState<MovieProps[] | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const movieUrl = "api/media";
      const allData = await FetchData(movieUrl, setIsLoading);
      setAllMovies(allData);
    };
    fetchAllData();
  }, []);
  const trending = allMovies?.filter(
    (item: MovieProps) => item.isTrending === true
  );

  return (
    <>
      <h2 className="text-3xl font-light my-5">Trending</h2>
      <Swiper
        slidesPerView={1.5}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          900: {
            slidesPerView: 2.6,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper mb-10"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {trending &&
              trending.map((trend: MovieProps) => (
                <SwiperSlide className="relative w-fit">
                  <TrendingCard key={trend.id} trend={trend} />
                </SwiperSlide>
              ))}
          </>
        )}
      </Swiper>
    </>
  );
};

export default Trending;
