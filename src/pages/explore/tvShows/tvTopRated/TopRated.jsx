import React, { useState } from "react";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../utils/useFetchApi";

import Carousel from "../../../../components/carousel/Carousel";

const TopRatedShows = () => {
  const { data, loading, error } = useFetch(`/tv/top_rated`);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>

        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default TopRatedShows;
