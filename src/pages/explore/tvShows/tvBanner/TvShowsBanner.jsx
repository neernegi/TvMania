import React, { useEffect, useState } from "react";
import Img from "../../../../components/lazyLoadImage/Img";
import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import useFetch from "../../../../utils/useFetchApi";
import { useGlobalContext } from "../../../../hooks/useContextApi";
import "./style.scss";
// import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const TvShowsBanner = () => {
  const [background, setBackground] = useState("");
  const { config } = useGlobalContext();

  const { data, loading, error } = useFetch("/tv/popular");

  useEffect(() => {
    if (config && data && data?.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data?.results.length);
      const backdropPath = data?.results[randomIndex].backdrop_path;
      const bg = config.backdrop + backdropPath;
      setBackground(bg);
    }
  }, [config, data]);

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
    </div>
  );
};

export default TvShowsBanner;
