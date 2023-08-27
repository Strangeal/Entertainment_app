const FetchData = async (url: string, setIsLoading: any) => {
  try {
    setIsLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export default FetchData;
