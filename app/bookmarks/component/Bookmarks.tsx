"use client";
import Card from "@/app/components/Card";
import FetchData from "@/app/components/fetch & filters/FetchData";
import Search from "@/app/components/Search";
import SearchFilter from "@/app/components/fetch & filters/SearchFiter";
import React, { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";
import axios from "axios";

const Bookmarks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [allMovies, setAllMovies] = useState<MovieProps[] | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const movieUrl = "http://localhost:3001/data";
      const allData = await axios.get(movieUrl);
      setAllMovies(allData.data);
    };
    fetchAllData();
  }, []);

  const MovieBookmarkData = allMovies?.filter(
    (item: any) => item.isBookmarked === true && item.category === "Movie"
  );
  const seriesBookmarkData = allMovies?.filter(
    (item: any) => item.isBookmarked === true && item.category === "TV Series"
  );

  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredMoviesSearch = SearchFilter({
    filterData: MovieBookmarkData ? MovieBookmarkData : [],
    searchQuery: searchQuery,
  });

  const filteredSeriesSearch = SearchFilter({
    filterData: seriesBookmarkData ? seriesBookmarkData : [],
    searchQuery: searchQuery,
  });

  return (
    <>
      <Search searchText="bookmarked shows" onSearch={handleSearch} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-3xl font-light my-5">
            {filteredMoviesSearch?.length === MovieBookmarkData?.length
              ? "Bookmarked Movies"
              : `Found ${filteredMoviesSearch?.length} results for '${searchQuery}' in Movies`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMoviesSearch?.map((movie: any) => (
              <Card
                key={movie.id}
                movie={movie}
                searchQuery={searchQuery}
                allMovies={allMovies}
                setAllMovies={setAllMovies}
              />
            ))}
          </div>
          <h2 className="text-3xl font-light mt-10 mb-5">
            {filteredSeriesSearch?.length === 0
              ? "No series found"
              : filteredSeriesSearch?.length === filteredSeriesSearch?.length
              ? "Bookmarked TV Series"
              : `Found ${filteredSeriesSearch?.length} results for '${searchQuery}' in TV Series`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSeriesSearch?.map((movie: any) => (
              <Card
                key={movie.id}
                movie={movie}
                searchQuery={searchQuery}
                allMovies={allMovies}
                setAllMovies={setAllMovies}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Bookmarks;
