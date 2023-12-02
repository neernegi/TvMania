import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

import useFetch from "../../../utils/useFetchApi";
import { fetchDataFromApi } from "../../../api/tvMania";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
// import MovieCard from "../../../components/movieCard/MovieCard";
import Spinner from "../../../components/spinner/Spinner";
import { useGlobalContext } from "../../../hooks/useContextApi";
import { Img } from "@chakra-ui/react";

const Anime = () => {
  const [background, setBackground] = useState("");
  const { config } = useGlobalContext();
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { mediaType } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/${mediaType}/top_rated`, {
      with_genres: "16", // 16 is the genre ID for Animation
    }).then((res) => {
      console.log(res)
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  // const fetchNextPageData = () => {
  //   fetchDataFromApi(`/${mediaType}/top_rated?page=${pageNum}`, {
  //     with_genres: "16", // 16 is the genre ID for Animation
  //   }).then((res) => {
  //     if (data?.results) {
  //       setData({
  //         ...data,
  //         results: [...data?.results, ...res.results],
  //       });
  //     } else {
  //       setData(res);
  //     }
  //     setPageNum((prev) => prev + 1);
  //   });
  // };

  useEffect(() => {
    setData(null);
    setPageNum(1);
    fetchInitialData();
  }, [mediaType]);

  useEffect(() => {
    if (config && data && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const backdropPath = data.results[randomIndex].backdrop_path;
      const bg = config.backdrop + backdropPath;
      setBackground(bg);
    }
  }, [config, data]);

  return (
    <div className="movieBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
    </div>
  );
};

export default Anime;
