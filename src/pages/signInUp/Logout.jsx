import React from "react";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  auth.signOut();
  alert("logout success");
  navigate("/");
};

export default Logout;
