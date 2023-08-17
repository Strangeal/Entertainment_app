import TrendingCard from "./TrendingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import useFetchFilter from "../fetch & filters/useFetchFilter";
import { useState } from "react";
import Spinner from "../Spinner";

const Trending = () => {
  const [isLoading, setIsLoading] = useState(false);
  const filterTrending = (item: any) => item.isTrending === true;
  const trending = useFetchFilter({ filterData: filterTrending, setIsLoading });

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
              trending.map((trend: any) => (
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
