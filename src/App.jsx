import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInUpTab from "./pages/signInUp/SignInUpTab";
// import Home from "./pages/home/Home";
import Movies from "./pages/explore/movies/Movies";
import TvShows from "./pages/explore/tvShows/TvShows";
import Anime from "./pages/explore/Anime/Anime";
import FilterData from "./pages/filterData/FilterData";
import Details from "./pages/details/Details";
import Header from "./components/header/Header";
import SearchResult from "./pages/search/searchResult/SearchResult";
import Search from "./pages/search/Search";
import Footer from "./components/footer/Footer";


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<SignInUpTab />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/:mediaType" element={<Anime />} />
        <Route path="/filter/:mediaType" element={<FilterData />} />
        <Route path={"/search"} element={<Search />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:mediaType/:id" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
