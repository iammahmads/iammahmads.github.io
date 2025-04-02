import { useState } from "react";
import { Tooltip } from "react-tooltip";

const tooltipStyle = {
  fontSize: "12px",
  color: "#e5e1eb",
  backgroundColor: "#310072",
  padding: "2px 4px",
};

const SocialSidebar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };
  return (
    <div className="fixed top-0 h-full flex items-center ">
      <div className="h-max bg-shadow shadow-lg shadow-secondry rounded-r-lg flex items-center">
        <div
          className={`${
            sideBarOpen ? "flex" : "hidden"
          } py-2 px-1 flex flex-col items-center justify-between border border-r-secondry transition-all ease-linear delay-1000`}
        >
          <p className="text-primary text-xs pb-2 font-semibold sm:text-sm md:text-base">
            Socials
          </p>

          <a href="https://github.com/iammahmads" target="_blank">
            <i
              data-tooltip-id="tooltip-github"
              data-tooltip-content="Github"
              className="fa-brands fa-github text-base text-black opacity-85 cursor-pointer hover:scale-105 hover:opacity-100 sm:text-lg md:text-xl lg:text-2xl "
            ></i>
          </a>
          <Tooltip id="tooltip-github" style={tooltipStyle} />

          <a
            href="www.linkedin.com/in/iammahmads"
            target="_blank"
          >
            <i
              data-tooltip-id="tooltip-linkedin"
              data-tooltip-content="Linkedin"
              className="fa-brands fa-linkedin-in text-base text-blue-800 opacity-85 cursor-pointer hover:scale-105 hover:opacity-100 sm:text-lg md:text-xl lg:text-2xl "
            ></i>
          </a>
          <Tooltip id="tooltip-linkedin" style={tooltipStyle} />

          <a
            href="mailto:mahmads0323@gmail.com?body=Hi,%20I%20need%20your%20assistance."
            target="_blank"
          >
            <i
              data-tooltip-id="tooltip-mail"
              data-tooltip-content="Email"
              className="fa-regular fa-envelope text-base  opacity-85 cursor-pointer hover:scale-105 hover:opacity-100 sm:text-lg md:text-xl lg:text-2xl "
            ></i>
          </a>
          <Tooltip id="tooltip-mail" style={tooltipStyle} />

          <a
            href="https://wa.me/+923236013625?text=Hi!%20I%20need%20your%20assistance."
            target="_blank"
          >
            <i
              data-tooltip-id="tooltip-whatsapp"
              data-tooltip-content="Whatsapp"
              className="fa-brands fa-whatsapp text-base text-green-800 opacity-85 cursor-pointer hover:scale-105 hover:opacity-100 sm:text-lg md:text-xl lg:text-2xl "
            ></i>
          </a>
          <Tooltip id="tooltip-whatsapp" style={tooltipStyle} />

          <a href="https://twitter.com/iammahmads" target="_blank">
            <i
              data-tooltip-id="tooltip-twitter"
              data-tooltip-content="X"
              className="fa-brands fa-x-twitter text-base text-black opacity-85 cursor-pointer hover:scale-105 hover:opacity-100 sm:text-lg md:text-xl lg:text-2xl "
            ></i>
          </a>
          <Tooltip id="tooltip-twitter" style={tooltipStyle} />
        </div>
        <button onClick={handleToggleSidebar} className="px-1">
          {sideBarOpen ? (
            <>
              <i
                data-tooltip-id="tooltip-scrollbar-hide"
                data-tooltip-content="hide socials"
                className="fa-solid fa-angle-left text-sm hover:scale-110 sm:text-base md:text-lg lg:text-xl"
              ></i>
              <Tooltip id="tooltip-scrollbar-hide" style={tooltipStyle} />
            </>
          ) : (
            <>
              <i
                data-tooltip-id="tooltip-scrollbar-show"
                data-tooltip-content="show socials"
                className="fa-solid fa-angles-right text-sm hover:scale-110 sm:text-base md:text-lg lg:text-xl"
              ></i>
              <Tooltip id="tooltip-scrollbar-show" style={tooltipStyle} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialSidebar;
