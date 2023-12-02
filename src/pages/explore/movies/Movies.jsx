import React from "react";

import MovieTrending from "./movieTrending/MovieTrending";
import PopularMovies from "./popularMovies/PopularMovies";
import TopRatedMovies from "./movieTopRated/MovieTopRated";
import { Box } from "@chakra-ui/react";
import "./style.scss";
import MoviesBanner from "./movieBanner/MoviesBanner";

const Movies = () => {
  return (
    <div>
      <MoviesBanner />
      <MovieTrending />
      <PopularMovies />
      <TopRatedMovies />
    </div>
  );
};

export default Movies;
