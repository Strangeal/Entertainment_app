import { useEffect, useState } from "react";
import FetchData from "./FetchData";

type FilterCategoryProps = {
  filterData: any;
  setIsLoading: any;
};

const useFetchFilter = ({ filterData, setIsLoading }: FilterCategoryProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await FetchData(
          "http://localhost:3001/data",
          setIsLoading
        );
        const filteredData = allData.filter(filterData);
        setData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchFilter;
