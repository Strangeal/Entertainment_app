import Image from "next/image";

const PlayBtn = () => {
  return (
    <>
      <div className="w-full h-full bg-black/40 invisible sm:group-hover:visible rounded-lg flex items-center justify-center mx-auto">
        <button className="invisible sm:group-hover:visible bg-white/50 rounded-3xl flex items-center justify-center p-2 w-28 font-medium text-lg">
          <Image
            className="mr-5"
            src="/assets/icon-play.svg"
            width={30}
            height={30}
            alt="play-icon"
          />
          Play
        </button>
      </div>
    </>
  );
};

export default PlayBtn;
