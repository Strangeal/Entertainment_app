"use client";
import FetchData from "@/app/components/FetchData";
import React, { useEffect, useState } from "react";
import SeriesCard from "../page";
import axios from "axios";
import Card from "@/app/components/Card";
import Search from "@/app/components/Search";

type Props = {};

const TvSeries = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const movieUrl = "http://localhost:3001/data";
    const fetchSeries = async () => {
      const allData = await FetchData(movieUrl);
      const seriesData = allData.filter(
        (item: any) => item.category === "TV Series"
      );
      setSeries(seriesData);
    };

    fetchSeries();
  }, []);
  console.log(series);

  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredSearch = series.filter(
    (movie: any) =>
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Search searchText="Tv-series" onSearch={handleSearch} />
      <h2 className="text-3xl font-light my-5">TV Series</h2>
      {filteredSearch.length === 0 ? (
        <h2 className="text-3xl font-light my-5">No series found</h2>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {series &&
            series.map((series: any) => (
              <Card key={series.id} movie={series} searchQuery={searchQuery} />
            ))}
        </div>
      )}
    </>
  );
};

export default TvSeries;
