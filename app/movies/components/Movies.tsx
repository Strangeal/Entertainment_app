"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FetchData from "@/app/components/FetchData";
import Card from "@/app/components/Card";
import Search from "@/app/components/Search";

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieUrl = "http://localhost:3001/data";
    const fetchMovies = async () => {
      const allData = await FetchData(movieUrl);
      const movieData = allData.filter(
        (item: any) => item.category === "Movie"
      );
      console.log(movieData);
      setMovies(movieData);
    };
    fetchMovies();
  }, []);

  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredSearch = movies.filter(
    (movie: any) =>
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Search searchText="Movies" onSearch={handleSearch} />
      <h2 className="text-3xl font-light my-5">Movies</h2>
      {filteredSearch.length === 0 ? (
        <h2 className="text-3xl font-light my-5">No movies found</h2>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSearch.map((movie: any) => (
            <Card key={movie.id} movie={movie} searchQuery={searchQuery} />
          ))}
        </div>
      )}
    </>
  );
};

export default Movies;
