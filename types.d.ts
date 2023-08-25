type MovieProps = {
  id: string;
  title: string;
  overview: string;
  trendingPoster: string;
  originalPoster: string;
  year: number;
  category: string;
  rating: string;
  isTrending: boolean;
  bookmarks: boolean;
};

type BookmarkProps = {
  id: string;
  isBookmarked: boolean;
  media: MovieProps;
  mediaId: string;
  userId: string;
};
type ProvidersProps = {
  credentials: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
  github: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
  google: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
  discord: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
};
