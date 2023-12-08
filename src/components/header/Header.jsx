import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase.config";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "../../api/tvMania";
import useFetch from "../../utils/useFetchApi";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState("top");
  const [showSearch, setShowSearch] = useState();
  const [query, setQuery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [genreOptions, setGenreOptions] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [isGenreOptionsVisible, setIsGenreOptionsVisible] = useState(false);
  const [displayedGenres, setDisplayedGenres] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [genreOptionsPosition, setGenreOptionsPosition] = useState({
    left: 0,
    top: 0,
  });
  const [isAnimeHovered, setIsAnimeHovered] = useState(false);
  const [animeOptionsPosition, setAnimeOptionsPosition] = useState({
    left: 0,
    top: 0,
  });

  const location = useLocation();
  const navigate = useNavigate();

  // USER LOGIN
  const getCurrentUser = async () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
        unsubscribe();
      });
    });
  };
  const fetchCurrentUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  // GENRE OPTION

  const fetchGenreOptions = async () => {
    try {
      const response = await fetchDataFromApi(`/genre/${mediaType}/list`);
      setGenreOptions(response.genres);
      setDisplayedGenres(response.genres.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoreClick = () => {
    setShowMore(true);
    setDisplayedGenres(genreOptions);
  };

  const handleLessClick = () => {
    setShowMore(false);
    setDisplayedGenres(genreOptions.slice(0, 4));
  };

  // SCROLL FUNCTION
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // LOGOUT FUNCTIONALITY

  const logoutUser = async () => {
    await auth.signOut();
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logout successful");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const handleGenreButtonHover = (mediaType, event) => {
    setIsGenreOptionsVisible(true);
    setMediaType(mediaType);

    const buttonRect = event.target.getBoundingClientRect();
    const genreOptionsLeft = buttonRect.left;
    const genreOptionsTop = buttonRect.top + buttonRect.height;
    setGenreOptionsPosition({ left: genreOptionsLeft, top: genreOptionsTop });
  };

  const handleGenreButtonLeave = () => {
    setIsGenreOptionsVisible(false);
  };

  const handleGenreButtonClick = (genreId, genreName) => {
    const selectedGenre = genreOptions.find((genre) => genre.id === genreId);
    7;
    navigate(`/filter/${mediaType}?genreId=${genreId}&genreName=${genreName}`);
  };

  const handleAnimeButtonHover = (event) => {
    console.log("Event:", event);
    console.log("Event target:", event.target);

    setIsAnimeHovered(true);

    if (event.target) {
      const buttonAnime = event.target.getBoundingClientRect();
      const animeOptionsLeft = buttonAnime.left;
      const animeOptionsTop = buttonAnime.top + buttonAnime.height;
      setAnimeOptionsPosition({ left: animeOptionsLeft, top: animeOptionsTop });
    }
  };

  // SEARCH QUERY

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const searchQueryHandler = (event) => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const animeHandler = (mediaType) => {
    if (mediaType === "movie") {
      navigate("/movie");
    } else {
      navigate("/tv");
    }
  };
  const genreHandler = (mediaType) => {
    if (mediaType === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  const handleAnimeButtonLeave = () => {
    setIsAnimeHovered(false);
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchGenreOptions();
  }, [mediaType]);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="wrapperNav">
          <ul>
           <Link to={'/tvshows'}>TvMania</Link>
          </ul>

          <ul className="menuItems">
            <Link
              className="menuItem"
              to={"/"}
              onMouseEnter={(event) => handleGenreButtonHover("tv", event)}
              onMouseLeave={handleGenreButtonLeave}
            >
              TvShows
            </Link>

            <Link
              className="menuItem"
              to={"/movies"}
              onMouseEnter={(event) => handleGenreButtonHover("movie", event)}
              onMouseLeave={handleGenreButtonLeave}
            >
              Movies
            </Link>

            <Link
              className="menuItem"
              onMouseEnter={(event) => handleAnimeButtonHover(event)}
              onMouseLeave={handleAnimeButtonLeave}
            >
              Anime
            </Link>

            <Link to={"/search"} className="menuItem searchButton">
              <HiOutlineSearch onClick={openSearch} />
            </Link>
          </ul>
        </div>
        {/* <div className="loginItems">
          {!user ? (
            <>
              <Link className="loginItem" to={"/login"}>
                Login
              </Link>
            </>
          ) : (
            <div className="profileItem">
              <button className="loginItem" onClick={handleLogout}>
                Logout
              </button>

              <Link className="loginItem">Profile</Link>
            </div>
          )}
        </div> */}
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={searchQueryHandler} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {/* TvShows and Movies Genre Functioanlity */}

      {isGenreOptionsVisible && (
        <div
          className={`genreOption ${isGenreOptionsVisible ? "visible" : ""}`}
          style={{
            left: genreOptionsPosition.left,
            top: genreOptionsPosition.top,
          }}
          onMouseEnter={() => setIsGenreOptionsVisible(true)}
          onMouseLeave={() => setIsGenreOptionsVisible(false)}
        >
          {displayedGenres.map((genre) => (
            <div
              onClick={() => handleGenreButtonClick(genre.id, genre.name)}
              className="genreList"
              key={genre.id}
            >
              {genre?.name}
            </div>
          ))}
          {!showMore && genreOptions.length > 4 && (
            <div className="genreList" onClick={handleMoreClick}>
              More
            </div>
          )}
          {showMore && (
            <div className="genreList" onClick={handleLessClick}>
              Less
            </div>
          )}
        </div>
      )}

      {/* For Anime Handler Functionality */}
      {isAnimeHovered && (
        <div
          style={{
            left: animeOptionsPosition.left,
            top: animeOptionsPosition.top,
          }}
          className="animeDiv"
          onMouseEnter={() => handleAnimeButtonHover(true)}
          onMouseLeave={() => handleAnimeButtonLeave(false)}
        >
          <button
            className="animeList"
            onClick={() => {
              animeHandler("tv");
            }}
          >
            Anime Series
          </button>
          <button
            className="animeList"
            onClick={() => {
              animeHandler("movie");
            }}
          >
            Movies
          </button>
        </div>
      )}

      {/* It's for Searching */}

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div
              style={{
                width: "100%",
                color: "black",
                padding: "2rem",
                backgroundColor: "gray",
                borderRadius: "2rem",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
              className="searchInput"
            >
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={() => searchQueryHandler(navigate("/search"))}
              />
              <VscChromeClose
                style={{ color: "black" }}
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
