import React, { useState } from "react";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../utils/useFetchApi";

import Carousel from "../../../../components/carousel/Carousel";

const PopularShows = () => {
  const { data, loading, error } = useFetch(`/tv/popular`);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Popular</span>

        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default PopularShows;
