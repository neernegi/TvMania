import { Box } from "@chakra-ui/react";
import React from "react";
import TvShowsBanner from "./tvBanner/TvShowsBanner";
import PopularShows from "./popularTvShows/PopularTvShow";
import TrendingShows from "./tvTrending/TvTrendingShow";
import TopRatedShows from "./tvTopRated/TopRated";
import TrendingShowByGenre from "./mostTrendingByGenre/TrendingShowByGenre";
import "./style.scss";

const TvShows = () => {
  return (
    <Box>
      <TvShowsBanner />
      <PopularShows />
      <TrendingShows />
      <TopRatedShows />
      <TrendingShowByGenre />
    </Box>
  );
};

export default TvShows;
