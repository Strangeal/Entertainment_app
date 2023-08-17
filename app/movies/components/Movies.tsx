"use client";
import React, { useState } from "react";
import Card from "@/app/components/Card";
import Search from "@/app/components/Search";
import SearchFilter from "@/app/components/fetch & filters/SearchFiter";
import useFetchFilter from "@/app/components/fetch & filters/useFetchFilter";
import Spinner from "@/app/components/Spinner";

const Movies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filterCategory = (item: any) => item.category === "Movie";
  const movies = useFetchFilter({
    filterData: filterCategory,
    setIsLoading,
  });

  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredSearch = SearchFilter({
    filterData: movies,
    searchQuery: searchQuery,
  });

  return (
    <>
      <Search searchText="Movies" onSearch={handleSearch} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-3xl font-light my-5">
            {filteredSearch.length === movies.length
              ? "Movies"
              : `Found ${filteredSearch.length} results for '${searchQuery}'`}
          </h2>
          {filteredSearch.length === 0 ? null : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSearch.map((movie: any) => (
                <Card key={movie.id} movie={movie} searchQuery={searchQuery} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Movies;
