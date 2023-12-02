import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../api/tvMania";
// import { fetchDataFromApi } from "../api/tvMania";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  

  const fetchApiConfig = async () => {
    try {
      const res = await fetchDataFromApi("/configuration");
      console.log(res)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      console.log(url)
      setConfig(url);
    } catch (error) {
      console.log("API error:", error);
    }
  };

  useEffect(() => {
    fetchApiConfig()
  }, []);

  return (
    <AppContext.Provider value={{ config }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
