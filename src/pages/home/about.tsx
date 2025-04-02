import STRATEGIES from "/3-STRATEGIES.png";

const About = () => {
  return (
    <section
      id="about-section"
      className="min-h-[100vh] w-full flex flex-col items-center justify-evenly p-8"
    >
      <h2 className="text-primary bg-secondry w-full text-center py-4 rounded-md text-xl font-bold md:text-2xl lg:text-3xl underline underline-offset-2">
        About me
      </h2>

      <div className="flex flex-col-reverse py-8 gap-4 lg:flex-row">
        <div className=" lg:flex-[50%] lg:flex lg:justify-end lg:items-center">
          <p className="text-lg text-textDecription lg:w-[90%]">
            I'm a 20-year-old software engineering student rocking my way to a
            Bachelor's degree. I love coding and have already built projects
            using the popular{" "}
            <span className="text-textHeading font-semibold">MERN</span> stack.
            Plus, I'm getting into the exciting world of{" "}
            <span className="text-textHeading font-semibold">BLOCKCHAIN</span>{" "}
            technology. What gets me most is building cool solutions that solve
            problems. When I'm not coding, I make sure to get enough sleep to
            stay on top of my game. And let me tell you, talking things through
            is super important <br /> &ndash; I understand things really fast!
          </p>
        </div>

        <div className="lg:flex-[50%] lg:flex lg:justify-start lg:items-center">
          <div className="h-[60%] w-full  flex justify-center lg:w-[90%] animate-[fade_2s_ease] ">
            <img src={STRATEGIES} alt="PROFILE_PHOTO" />
          </div>
        </div>
      </div>
    </section>
  );
};

// bg-splashScreen bg-top bg-no-repeat bg-contain

export default About;
