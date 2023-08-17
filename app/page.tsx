"use client";
import { useEffect, useState } from "react";
import FetchData from "./components/fetch & filters/FetchData";
import Search from "./components/Search";
import Card from "./components/Card";
import Trending from "./components/trending/Trending";
import SearchFilter from "./components/fetch & filters/SearchFiter";
import Spinner from "./components/Spinner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      const movieUrl = "http://localhost:3001/data";
      const allData = await FetchData(movieUrl, setIsLoading);
      setAllMovies(allData);
    };
    fetchAllData();
  }, []);

  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredSearch = SearchFilter({
    filterData: allMovies,
    searchQuery: searchQuery,
  });

  const newFilteredSearch = filteredSearch.sort(() => Math.random() - 0.5);

  return (
    <>
      <Search searchText="Movies or TV Series" onSearch={handleSearch} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Trending />
          <h2 className="text-3xl font-light my-5">
            {newFilteredSearch.length === allMovies.length
              ? "Recommended for you"
              : `Found ${newFilteredSearch.length} results for '${searchQuery}'`}
          </h2>
          {newFilteredSearch.length === 0 ? null : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
              {newFilteredSearch.slice(0, 12).map((movie: any) => (
                <Card key={movie.id} movie={movie} searchQuery={searchQuery} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
