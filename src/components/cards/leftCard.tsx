import portfolioItemType from "../../pages/home/portfolioItemType";
import StackCard from "./stackCard";

const LeftCard = ({
  title,
  description,
  image,
  stack,
  repositoryLink,
}: portfolioItemType) => {
  return (
    <div className="w-full flex animate-[fade_2s_ease]">
      {/* content */}
      <div className="w-full flex flex-col bg-secondry border border-primary shadow-md shadow-primary my-2 lg:w-[75%] lg:flex-row  lg:rounded-r-full lg:border-r lg:border-primary ">
        <div className="lg:w-[45%]">
          <img
            src={image}
            alt={image}
            loading="lazy"
            className="h-full w-full"
          />
        </div>
        <div className="p-4 flex flex-col gap-2 text-primary lg:w-[45%]">
          <h2 className="font-semibold text-base md:text-lg">
            Project:{" "}
            <span className="text-textDecription font-semibold">{title}</span>
          </h2>
          <h3 className="font-semibold md:text-base">
            Description:{" "}
            <span className="text-textDecription font-normal">
              {description}
            </span>
          </h3>
          <div>
            <p className="inline-block font-semibold md:text-base">
              Stack:{" "}
            </p>
            {stack.map((item, index) => (
              <StackCard name={item} key={index} />
            ))}
          </div>
          <a
            href={repositoryLink}
            className="flex items-center gap-2 text-textDecription"
            target="_blank"
          >
            <i className="fa-brands fa-github text-lg md:text-xl lg:text-2xl"></i>
            <p className="text-xs underline text-textDecription hover:scale-105 md:text-sm">
              view code
            </p>
          </a>
        </div>
      </div>
      {/* empty space */}
      <div className="hidden lg:block lg:w-[25%]"></div>
    </div>
  );
};

export default LeftCard;
