import React, { useState } from "react";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../utils/useFetchApi";
import { Box } from "@chakra-ui/react";
import Carousel from "../../../../components/carousel/Carousel";

const TopRatedMovies = () => {
  const { data, loading, error } = useFetch(`/movie/top_rated`);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>

        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default TopRatedMovies;
