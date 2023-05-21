import React from "react";
import { useGlobalContext } from "../context/context";
import { Link, NavLink } from "react-router-dom";
import Layout from "../basic/layout";
import Sidebar from "./sidebar";
import "../../scss/index.scss";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Chart from "react-apexcharts";
import Reading from "./Reading";
import Completed from "./Completed";
import PlanToRead from "./PlanToRead";
import Footer from "./Footer";

const UserDashboard = () => {
  const { auth } = useGlobalContext();

  return (
    <Layout title="Book - Shelf">
      <Reading />
      <Completed />
      <PlanToRead />
      <Footer />
    </Layout>
  );
};

export default UserDashboard;
