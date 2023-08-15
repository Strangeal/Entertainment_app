import { useEffect, useState } from "react";
import FetchData from "./FetchData";

type FilterCategoryProps = {
  filterData: any;
};

const useFetchFilter = ({ filterData }: FilterCategoryProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const allData = await FetchData("http://localhost:3001/data");
      const filteredData = allData.filter(filterData);
      setData(filteredData);
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchFilter;
