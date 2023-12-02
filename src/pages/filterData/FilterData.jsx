import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import useFetch from "../../utils/useFetchApi";
import { fetchDataFromApi } from "../../api/tvMania";
import MovieCard from "../../components/movieCard/MovieCard";
import MoviesBanner from "../explore/movies/movieBanner/MoviesBanner";
import "./style.scss";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const FilterData = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [sortby, setSortby] = useState('');
  const [sortedGenres, setSortedGenres] = useState('');
  const { mediaType } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreId = queryParams.get("genreId");

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const yearData = Array.from({ length: 2023 - 1995 + 1 }, (_, index) => ({
    value: 1995 + index,
    label: (1995 + index).toString(),
  }));
  const fetchYearData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, {
      with_year: selectedYear ? selectedYear.value : null,
    }).then((res) => {
      console.log(res);
      setSelectedYear(res);
      setLoading(false);
    });
  };
  const fetchInitialData = () => {
    setLoading(true);
    if (selectedYear) {
      // Check if selectedYear is not null or undefined
      filters.primary_release_year = selectedYear.value;
    }
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    if (selectedYear) {
      // Check if selectedYear is not null or undefined
      filters.primary_release_year = selectedYear.value;
    }
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    filters = {};

    if (genreId) {
      filters.with_genres = genreId;
    }

    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
    fetchYearData();
  }, [mediaType, genreId]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    if (action.name === "year") {
      setSelectedYear(selectedItems);
      if (action.action !== "clear") {
        filters.with_year = selectedItems.value;
      } else {
        delete filters.with_year;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  useEffect(() => {
    if (genresData?.genres && genreId) {
      const selectedGenre = genresData.genres.find(
        (genre) => genre.id === parseInt(genreId)
      );
      setGenre(selectedGenre);
    }
  }, [genresData, genreId]);

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={sortedGenres || genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
            <Select
              name="year"
              value={selectedYear}
              options={yearData}
              onChange={onChange}
              isClearable={true}
              placeholder="Select year"
              className="react-select-container yearDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return null;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default FilterData;
