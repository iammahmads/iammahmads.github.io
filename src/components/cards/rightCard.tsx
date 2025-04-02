import portfolioItemType from "../../pages/home/portfolioItemType";
import StackCard from "./stackCard";

const RightCard = ({
  title,
  description,
  image,
  stack,
  repositoryLink,
}: portfolioItemType) => {
  return (
    <div className="w-full flex animate-[fade_2s_ease]">
      {/* empty space */}
      <div className="hidden lg:block lg:w-[25%]"></div>
      {/* content */}
      <div className="w-full flex flex-col-reverse bg-secondry border border-primary shadow-md shadow-primary my-2 lg:w-[75%] lg:flex-row lg:justify-end lg:rounded-l-full lg:border-r lg:border-primary ">
        <div className="p-4 flex flex-col gap-2  text-primary lg:w-[45%] ">
          <h2 className=" font-semibold text-base md:text-lg">
            Project:{" "}
            <span className="text-textDecription font-semibold">{title}</span>
          </h2>
          <h3 className=" font-semibold md:text-base">
            Description:{" "}
            <span className=" text-textDecription font-normal">
              {description}
            </span>
          </h3>
          <div>
            <p className="inline-block font-semibold md:text-base">Stack: </p>
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

        <div className="lg:w-[45%]">
          <img
            src={image}
            alt={image}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RightCard;
