import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../utils/useFetchApi";
import AnimeBanner from "./animeBanner/AnimeBanner";
import { fetchDataFromApi } from "../../../api/tvMania";
import PopularAnime from "./popularData/PopularData";

const Anime = () => {
  const [data, setData] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [TrendingData, setTrendingData] = useState(null);

  const [loading, setLoading] = useState(false);
  const { mediaType } = useParams();

  const fetchTopRatedData = () => {
    setLoading(true);
    fetchDataFromApi(`/${mediaType}/top_rated`, {
      with_genres: "16", // 16 is the genre ID for Animation
    }).then((res) => {
      console.log(res);
      setData(res);
      setLoading(false);
    });
  };

  const fetchPopularData = () => {
    setLoading(true);
    fetchDataFromApi(`/${mediaType}/popular`, {
      with_genres: "16", // 16 is the genre ID for Animation
    }).then((res) => {
      console.log(res);
      setPopularData(res);

      setLoading(false);
    });
  };
  const fetchTrendingData = () => {
    setLoading(true);
    fetchDataFromApi(`/trending/all/week`, {
      with_genres: "16", // 16 is the genre ID for Animation
    }).then((res) => {
      console.log(res);
      setTrendingData(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchTopRatedData();
    fetchPopularData();
    fetchTrendingData();
  }, [mediaType]);

  return (
    <div>
      <AnimeBanner data={data} loading={loading} />
      <PopularAnime data={popularData} loading={loading} />
    </div>
  );
};

export default Anime;
