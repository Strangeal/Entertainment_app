import Link from "next/link";

const NoSessionView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <p>Please sign in to view your bookmarks</p>
      <Link
        href="/signin"
        className="w-28 text-sm bg-prime-orange text-white p-3 text-center font-light rounded-md my-5 transition-all duration-300 hover:bg-white hover:text-prime-black"
      >
        Sign in
      </Link>
    </div>
  );
};

export default NoSessionView;
