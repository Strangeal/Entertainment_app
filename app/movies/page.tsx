import Search from "../components/Search";
import Movies from "./components/Movies";

type MovieProps = {
  movie: any;
};

const MovieCard = ({ movie }: MovieProps) => {
  console.log(movie);

  return (
    <div>
      <Search searchText="Movies" />
      <h1>Movies Page</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Movies />
      </div>
    </div>
  );
};

export default MovieCard;
