type FilterProps = {
  filterData: MovieProps[] | null;
  searchQuery: string;
};

const SearchFilter = ({ filterData, searchQuery }: FilterProps) => {
  return filterData?.filter(
    (movie: MovieProps) =>
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default SearchFilter;
