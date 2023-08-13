"use client";
import FetchData from "@/app/components/FetchData";
import React, { useEffect, useState } from "react";
import SeriesCard from "../page";
import axios from "axios";
import Card from "@/app/components/Card";

type Props = {};

const TvSeries = (props: Props) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const movieUrl = "http://localhost:3001/data";
    const fetchSeries = async () => {
      const allData = await FetchData(movieUrl);
      const seriesData = allData.filter(
        (item: any) => item.category === "TV Series"
      );
      setSeries(seriesData);
    };

    fetchSeries();
  }, []);
  console.log(series);

  return (
    <>
      <h2>TvSeries</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {series &&
          series.map((series, index) => <Card key={index} movie={series} />)}
      </div>
    </>
  );
};

export default TvSeries;
