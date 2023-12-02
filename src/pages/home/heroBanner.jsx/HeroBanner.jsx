// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactPlayer from "react-player";
// import { fetchDataFromApi } from "../../../api/tvMania";

// const HomePageBanner = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrendingVideos = async () => {
//       try {
//         const response = await fetchDataFromApi("//trending/movie/day");
//         console.log(response.results);

//         const trendingVideos = response.results.filter(
//           (result) =>
//             result.site === "YouTube" &&
//             (result.media_type === "movie" || result.media_type === "tv")
//         );
//         console.log(trendingVideos);

//         setVideos(trendingVideos);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching trending videos:", error);
//         setLoading(false);
//       }
//     };

//     fetchTrendingVideos();
//   }, []);

//   const getVideoUrl = (videoKey) => {
//     return `https://www.youtube.com/watch?v=${videoKey}`;
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {videos.map((video) => (
//             <ReactPlayer
//               key={video.id}
//               url={getVideoUrl(video.key)}
//               playing={true}
//               loop={true}
//               muted={true}
//               width="100%"
//               height="auto"
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePageBanner;


import React from 'react'

const HeroBanner = () => {
  return (
    <div>
      HomePageBanner
    </div>
  )
}

export default HeroBanner

