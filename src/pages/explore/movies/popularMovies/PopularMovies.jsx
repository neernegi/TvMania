import React, { useState } from "react";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../utils/useFetchApi";
import { Box } from "@chakra-ui/react";
import Carousel from "../../../../components/carousel/Carousel";

const PopularMovies = () => {
  const { data, loading, error } = useFetch(`/movie/popular`);

  return (
    <Box className="carouselSection">
      <ContentWrapper>
        <Box as="span" className="carouselTitle">
          Popular
        </Box>

        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </Box>
  );
};

export default PopularMovies;
