import Navbar from "../components/Navbar";

const MoviesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="bg-prime-dark fixed top-0 z-50 w-full sm:max-w-[95vw] sm:m-5 sm:rounded-lg lg:w-fit lg:h-[95vh]">
        <Navbar />
      </header>
      <main className="mt-20 sm:mt-28 mx-5 lg:mt-10 lg:ml-32">{children}</main>
    </>
  );
};

export default MoviesLayout;
