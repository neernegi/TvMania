import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../../../api/tvMania";
import SwitchTabs from "../../../../components/switchTabs/SwitchTabs";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import Carousel from "../../../../components/carousel/Carousel";
import { useParams } from "react-router-dom";


const TrendingShowByGenre = () => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const { mediaType } = useParams();
  const [endpoint, setEndpoint] = useState("day");
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  const fetchTrendingData = () => {
    setLoading(true);
    fetchDataFromApi(`/trending/tv/${endpoint}`, {
      with_genres: "10766", // 16 is the genre ID for Animation
    }).then((res) => {
      console.log(res);
      setData(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchTrendingData();
  }, [mediaType]);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Daily Soap</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default TrendingShowByGenre;
