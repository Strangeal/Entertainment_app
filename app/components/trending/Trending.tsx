import React, { useEffect, useState } from "react";
import FetchData from "../FetchData";
import TrendingCard from "./TrendingCard";

const Trending = () => {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    const fetchTrending = async () => {
      const allData = await FetchData("http://localhost:3001/data");
      const trendingMovies = allData.filter(
        (item: any) => item.isTrending === true
      );
      setTrending(trendingMovies);
    };

    fetchTrending();
  }, []);

  return (
    <div>
      <h2 className="text-3xl my-5">Trending</h2>
      {trending && trending.map((trend) => <TrendingCard trend={trend} />)}
    </div>
  );
};

export default Trending;
