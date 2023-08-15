type FilterProps = {
  filterData: any;
  searchQuery: string;
};

const SearchFilter = ({ filterData, searchQuery }: FilterProps) => {
  return filterData.filter(
    (movie: any) =>
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default SearchFilter;
