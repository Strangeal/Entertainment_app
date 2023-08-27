"use client";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import Trending from "../components/trending/Trending";
import SearchFilter from "../components/fetch & filters/SearchFiter";
import Spinner from "../components/Spinner";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState<MovieProps[] | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const movieUrl = "/api/media";
      const allData = await axios.get(movieUrl);
      setAllMovies(allData.data);
    };
    fetchAllData();
  }, []);

  const handleSearch = (searchResult: string) => {
    setSearchQuery(searchResult);
  };

  const filteredSearch = SearchFilter({
    filterData: allMovies ? allMovies : [],
    searchQuery: searchQuery,
  });

  return (
    <>
      <Search searchText="Movies or TV Series" onSearch={handleSearch} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Trending />
          <h2 className="text-3xl font-light my-5">
            {filteredSearch?.length === allMovies?.length
              ? "Recommended for you"
              : `Found ${filteredSearch?.length} results for '${searchQuery}'`}
          </h2>
          {filteredSearch?.length === 0 ? null : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
              {filteredSearch?.slice(0, 12).map((movie: any) => (
                <Card
                  key={movie.id}
                  movie={movie}
                  searchQuery={searchQuery}
                  // allMovies={allMovies}
                  // setAllMovies={setAllMovies}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
