type BtnProps = {
  handleClick: () => void;
  bookmarkStatus: boolean;
};

const BookmarkBtn = ({ bookmarkStatus, handleClick }: BtnProps) => {
  return (
    <div>
      {bookmarkStatus ? (
        <button
          onClick={handleClick}
          className="bg-prime-dark opacity-60 p-2.5 rounded-full absolute top-0 right-0 m-3 z-10 hover:bg-white hover:opacity-100 hover:text-black fill-current"
        >
          <svg
            className="w-[0.72rem] h-[0.8rem] mx-auto"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="block bg-prime-dark opacity-60 p-2.5 rounded-full absolute top-0 right-0 m-3 hover:bg-white hover:opacity-100 hover:text-black"
        >
          <svg
            className="w-[0.72rem] h-[0.8rem] mx-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BookmarkBtn;
