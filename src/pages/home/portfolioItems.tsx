import portfolioItemType from "./portfolioItemType";
import URL_SHORTNER from "/URL_SHORTNER.png";
import BLOGGER from "/BLOGGER.png";
import ECOMMERECE from "/ECOMMERECE.png";
import HOSPITAL from "/HOSPITAL.png";
import BUS_MANAGMENT from "/BUS_MANAGMENT.png";

let portfolioItems: portfolioItemType[] = [
  {
    title: "URL shortner",
    description: "shotening the really long URL's at ease",
    image: URL_SHORTNER,
    stack: [
      "React",
      "Node js",
      "Express",
      "MongoDb",
      "Chart js",
      "JavaScript",
      "Tailwind",
    ],
    repositoryLink: "https://github.com/iammahmads/short-url",
  },
  {
    title: "Blogger",
    description:
      "Allowing user to create and read blogs using their own accounts",
    image: BLOGGER,
    stack: [
      "React",
      "Node js",
      "Express",
      "MongoDb",
      "Quil Text",
      "JavaScript",
      "Tailwind",
    ],
    repositoryLink: "https://github.com/iammahmads/blooging",
  },
  {
    title: "Ecommerce",
    description: "Users can view and buy products listed on website",
    image: ECOMMERECE,
    stack: [
      "React",
      "Node js",
      "Express",
      "MongoDb",
      "Google Drive",
      "TypeScript",
      "Tailwind",
    ],
    repositoryLink: "https://github.com/iammahmads/dev-ecommerce",
  },
  {
    title: "Hospital Mangment",
    description: "Let patients and doctor interact with each other",
    image: HOSPITAL,
    stack: ["React", "Node js", "Express", "MongoDb", "Nodemailer", "Tailwind"],
    repositoryLink: "https://github.com/iammahmads/Client-Hospital-Managment",
  },
  {
    title: "Bus Mangment",
    description:
      "Allows users to buy tickets. This website has admin panel for monitoring",
    image: BUS_MANAGMENT,
    stack: [
      "React",
      "Tailwind",
      "TypeScript",
      "Node js",
      "Express",
      "SQL Server",
      "Repository Design Pattern",
    ],
    repositoryLink: "https://github.com/iammahmads/bus-managment",
  },
];

// Reverse the items to show last item (newest) at top.
portfolioItems = portfolioItems.reverse();

export default portfolioItems;
