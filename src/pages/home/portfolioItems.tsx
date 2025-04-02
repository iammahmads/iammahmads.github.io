import portfolioItemType from "./portfolioItemType";
import URL_SHORTNER from "/URL_SHORTNER.png";
import BLOGGER from "/BLOGGER.png"
import ECOMMERECE from "/ECOMMERECE.png"
import HOSPITAL from "/HOSPITAL.png"

const portfolioItems: portfolioItemType[] = [
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
    repositoryLink: "https://github.com/mahmads0323/short-url",
  },
  {
    title: "Blogger",
    description: "Allowing user to create and read blogs using their own accounts",
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
    repositoryLink: "https://github.com/mahmads0323/blooging",
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
    repositoryLink: "https://github.com/mahmads0323/dev-ecommerce",
  },
  {
    title: "Hospital Mangment",
    description: "Let patients and doctor interact with each other",
    image: HOSPITAL,
    stack: [
      "React",
      "Node js",
      "Express",
      "MongoDb",
      "Nodemailer",
      "Tailwind",
    ],
    repositoryLink: "https://github.com/mahmads0323/Client-Hospital-Managment",
  },
];

export default portfolioItems;
