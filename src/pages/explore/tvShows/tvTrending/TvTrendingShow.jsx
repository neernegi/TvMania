import React, { useState } from "react";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../utils/useFetchApi";

import SwitchTabs from "../../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../../components/carousel/Carousel";

const TrendingShows = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading, error } = useFetch(`/trending/tv/${endpoint}`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default TrendingShows;
