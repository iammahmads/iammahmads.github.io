import LeftCard from "../../components/cards/leftCard";
import RightCard from "../../components/cards/rightCard";
import portfolioItems from "./portfolioItems";

const Portfolio = () => {
  return (
    <section
      id="portfolio-section"
      className="flex flex-col items-center justify-center p-8"
    >
      <h2 className="text-primary bg-secondry w-full text-center py-4 rounded-md text-xl font-bold md:text-2xl lg:text-3xl">
        &lt; Projects / &gt;
      </h2>
      <div className="w-full flex justify-center py-4">
        <div className="w-[100%] flex flex-col justify-center gap-4 lg:gap-8">
          {portfolioItems.map((item, index) => {
            if (index % 2 == 0) {
              return <LeftCard {...item} key={index} />;
            } else {
              return <RightCard {...item} key={index} />;
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
