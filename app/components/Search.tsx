"use client";
import React, { useState } from "react";
type SearchProps = {
  searchText: string;
  onSearch: any;
};

const Search = ({ searchText, onSearch }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: any) => {
    const search = e.target.value;
    setSearchQuery(search);
    onSearch(search);
  };
  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          className="block w-full p-4 pl-8 text-white font-light text-sm bg-transparent focus:border-b focus:ring-prime-dark focus:border-prime-gray outline-none"
          placeholder={`Search for ${searchText}`}
          required
        />
      </div>
    </form>
  );
};

export default Search;
