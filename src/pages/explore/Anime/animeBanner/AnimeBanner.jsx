import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../../hooks/useContextApi';
import Img from '../../../../components/lazyLoadImage/Img';

const AnimeBanner = ({data,loading}) => {
    const [background, setBackground] = useState("");
    const { config } = useGlobalContext();
  
  
  
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
}

export default AnimeBanner
