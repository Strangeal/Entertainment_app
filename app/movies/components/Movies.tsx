"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FetchData from "@/app/components/FetchData";
import Card from "@/app/components/Card";

const Movies = () => {
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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies &&
          movies.map((movie: any, index) => <Card key={index} movie={movie} />)}
      </div>
    </>
  );
};

export default Movies;
