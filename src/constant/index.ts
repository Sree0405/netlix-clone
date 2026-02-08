import { CustomGenre } from "src/types/Genre";

export const API_ENDPOINT_URL = "/api/tmdb";
export const TMDB_V3_API_KEY = ""; // Kept for type safety if used elsewhere, but value is empty

export const MAIN_PATH = {
  root: "",
  browse: "browse",
  genreExplore: "genre",
  watch: "watch",
  search: "search",
  myList: "my-list",
  movies: "movies",
  tvShows: "tv-shows",
};

export const ARROW_MAX_WIDTH = 60;
export const COMMON_TITLES: CustomGenre[] = [
  { name: "Tamil Movies", apiString: "tamil", language: "ta" },
  { name: "Telugu Movies", apiString: "telugu", language: "te" },
  { name: "Popular", apiString: "popular" },
  { name: "Top Rated", apiString: "top_rated" },
  { name: "Now Playing", apiString: "now_playing" },
  { name: "Upcoming", apiString: "upcoming" },
];

export const YOUTUBE_URL = "https://www.youtube.com/watch?v=";
export const APP_BAR_HEIGHT = 70;

export const INITIAL_DETAIL_STATE = {
  id: undefined,
  mediaType: undefined,
  mediaDetail: undefined,
};
