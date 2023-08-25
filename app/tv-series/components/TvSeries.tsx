"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import Search from "@/app/components/Search";
import SearchFilter from "@/app/components/fetch & filters/SearchFiter";
import Spinner from "@/app/components/Spinner";
import axios from "axios";

type Props = {};

const TvSeries = (props: Props) => {
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

  const filterCategory = allMovies?.filter(
    (item: any) => item.category === "TV Series"
  );
  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredSearch = SearchFilter({
    filterData: filterCategory ? filterCategory : [],
    searchQuery: searchQuery,
  });

  return (
    <>
      <Search searchText="Tv-series" onSearch={handleSearch} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-3xl font-light my-5">
            {filteredSearch?.length === filterCategory?.length
              ? "TV Series"
              : `Found ${filteredSearch?.length} results for '${searchQuery}'`}
          </h2>
          {filteredSearch?.length === 0 ? null : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {filterCategory &&
                filterCategory.map((series: any) => (
                  <Card
                    key={series.id}
                    movie={series}
                    searchQuery={searchQuery}
                    allMovies={allMovies}
                    setAllMovies={setAllMovies}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TvSeries;
