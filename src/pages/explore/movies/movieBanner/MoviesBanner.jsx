import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../hooks/useContextApi";
import useFetch from "../../../../utils/useFetchApi";
import Img from "../../../../components/lazyLoadImage/Img";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
// import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";

const MoviesBanner = () => {
  const [background, setBackground] = useState("");
  const { config } = useGlobalContext();

  const { data, loading, error } = useFetch("/movie/popular");

  useEffect(() => {
    if (config && data && data?.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data?.results.length);
      const backdropPath = data?.results[randomIndex].backdrop_path;
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

export default MoviesBanner;
