import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Responsive images */}
      <img
        src={assets.main_banner_bg}
        alt="main_banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="main_banner"
        className="w-full md:hidden"
      />

      {/* Banner Text */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white px-4 md:px-16 text-center">
        <h1 className="text-2xl text-black md:text-4xl font-semibold mb-6">
          Freshness you can taste,
           quality you can trust!
        </h1>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Mobile button */}
          <Link
            to="/products"
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer md:hidden"
          >
            Shop now
            <img
              className="transition group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow_icon"
            />
          </Link>

          {/* Desktop button */}
          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-9 py-3 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition rounded cursor-pointer"
          >
            Explore deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow_icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
