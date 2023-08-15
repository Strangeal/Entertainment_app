"use client";
import Card from "@/app/components/Card";
import FetchData from "@/app/components/fetch & filters/FetchData";
import Search from "@/app/components/Search";
import SearchFilter from "@/app/components/fetch & filters/SearchFiter";
import useFetchFilter from "@/app/components/fetch & filters/useFetchFilter";
import React, { useState } from "react";

const Bookmarks = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const MovieBookmarkData = (item: any) =>
    item.isBookmarked === true && item.category === "Movie";
  const boomarkedMovies = useFetchFilter({ filterData: MovieBookmarkData });
  const seriesBookmarkData = (item: any) =>
    item.isBookmarked === true && item.category === "TV Series";
  const bookmarkedSeries = useFetchFilter({ filterData: seriesBookmarkData });

  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredMoviesSearch = SearchFilter({
    filterData: boomarkedMovies,
    searchQuery: searchQuery,
  });

  const filteredSeriesSearch = SearchFilter({
    filterData: bookmarkedSeries,
    searchQuery: searchQuery,
  });

  return (
    <>
      <Search searchText="bookmarked shows" onSearch={handleSearch} />
      <h2 className="text-3xl font-light my-5">
        {filteredMoviesSearch.length === 0
          ? "No series found"
          : filteredMoviesSearch.length === boomarkedMovies.length
          ? "Bookmarked Movies"
          : `Found ${filteredMoviesSearch.length} results for '${searchQuery}' in Movies`}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMoviesSearch.map((movie: any) => (
          <Card key={movie.id} movie={movie} searchQuery={searchQuery} />
        ))}
      </div>
      <h2 className="text-3xl font-light mt-10 mb-5">
        {filteredSeriesSearch.length === 0
          ? "No series found"
          : filteredSeriesSearch.length === bookmarkedSeries.length
          ? "Bookmarked TV Series"
          : `Found ${filteredSeriesSearch.length} results for '${searchQuery}' in TV Series`}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredSeriesSearch.map((movie: any) => (
          <Card key={movie.id} movie={movie} searchQuery={searchQuery} />
        ))}
      </div>
    </>
  );
};

export default Bookmarks;
