"use client";
import Card from "@/app/components/Card";
import Search from "@/app/components/Search";
import SearchFilter from "@/app/components/fetch & filters/SearchFiter";
import React, { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FetchData from "@/app/components/fetch & filters/FetchData";
import NoSessionView from "@/app/(Auth)/component/NoSessionView";

const Bookmarks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState<MovieProps[] | null>(null);
  const { data: session } = useSession();

  let dataArray: any = [];
  useEffect(() => {
    if (!session?.user) return;

    const fetchAllData = async () => {
      if (session?.user) {
        const movieUrl = `api/bookmarks/${session?.user?.id}`;
        try {
          const allData = await FetchData(movieUrl, setIsLoading);
          if (Array.isArray(allData)) {
            dataArray = allData.map((item: BookmarkProps) => item.media);
            setAllMovies(dataArray);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchAllData();
  }, [session]);

  if (!session?.user) return <NoSessionView />;

  const MovieBookmarkData = allMovies?.filter(
    (item: MovieProps) => item.category === "Movie"
  );
  const seriesBookmarkData = allMovies?.filter(
    (item: MovieProps) => item.category === "TV Series"
  );

  const handleSearch = (searchResult: string) => {
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
            {filteredMoviesSearch?.length === 0
              ? "No series found"
              : filteredMoviesSearch?.length === MovieBookmarkData?.length
              ? "Bookmarked Movies"
              : `Found ${filteredMoviesSearch?.length} results for '${searchQuery}' in Movies`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMoviesSearch?.map((movie: MovieProps) => (
              <Card key={movie.id} movie={movie} searchQuery={searchQuery} />
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
            {filteredSeriesSearch?.map((movie: MovieProps) => (
              <Card key={movie.id} movie={movie} searchQuery={searchQuery} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Bookmarks;
