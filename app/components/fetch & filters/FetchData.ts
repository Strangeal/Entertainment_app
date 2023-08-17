const FetchData = async (url: any, setIsLoading: any) => {
  try {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

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
