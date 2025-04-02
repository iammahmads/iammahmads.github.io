// import PROFILE_PHOTO from "/PROFILE_PHOTO.jpg";

const Hero = () => {
  return (
    <section className="h-[100vh] flex items-center justify-center bg-secondry relative">
      <div className="w-[90%] flex flex-col justify-center items-center gap-4 overflow-hidden">
        <p className="text-xl text-primary uppercase md:text-2xl lg:text-3xl ">
          &ndash;&ndash;&ndash; welcome &ndash;&ndash;&ndash;
        </p>
        <p className="text-lg w-full text-textDecription text-center text-wrap md:text-xl lg:text-2xl">
          <span className="block">It's great to have you here.</span>I am&nbsp;
          <span className="text-xl text-primary font-semibold md:text-2xl lg:text-3xl">
            Ahmad
          </span>{" "}
          Software Engineer. &#128526;
        </p>
        <div className="w-full flex justify-center animate-[showUp_2s_ease] ">
          <a
            href="#about-section"
            className="bg-primary text-secondry rounded-lg px-2 py-1 my-1 w-min text-nowrap active:scale-95 text-lg md:text-xl"
          >
            About me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
