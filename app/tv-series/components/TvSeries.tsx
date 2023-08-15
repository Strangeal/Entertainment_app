"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import Search from "@/app/components/Search";
import SearchFilter from "@/app/components/fetch & filters/SearchFiter";
import useFetchFilter from "@/app/components/fetch & filters/useFetchFilter";

type Props = {};

const TvSeries = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterCategory = (item: any) => item.category === "TV Series";
  const series = useFetchFilter({ filterData: filterCategory });

  const handleSearch = (searchResult: any) => {
    setSearchQuery(searchResult);
  };

  const filteredSearch = SearchFilter({
    filterData: series,
    searchQuery: searchQuery,
  });

  return (
    <>
      <Search searchText="Tv-series" onSearch={handleSearch} />
      <h2 className="text-3xl font-light my-5">
        {filteredSearch.length === 0
          ? "No series found"
          : filteredSearch.length === series.length
          ? "TV Series"
          : `Found ${filteredSearch.length} results for '${searchQuery}'`}
      </h2>
      {filteredSearch.length === 0 ? null : (
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
