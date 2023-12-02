import React, { useState } from "react";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../utils/useFetchApi";

import Carousel from "../../../../components/carousel/Carousel";

const PopularAnime = ({ data, loading }) => {
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span style={{ color: "black" }} className="carouselTitle">
          Popular
        </span>

        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default PopularAnime;
