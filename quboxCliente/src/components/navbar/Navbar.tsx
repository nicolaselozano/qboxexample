"use client";
import React, { useState } from "react";
import iconqb from "../../assets/qbox-nofondo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const list = [
    { name: "LumberJack", url: "https://tbot.xyz/lumber/" },
    { name: "Youtube", url: "https://www.youtube.com/@DotDager" },
    { name: "Github", url: "https://github.com/MarianoVilla" },
    { name: "Instagram", url: "https://www.instagram.com/dager.32/" },
    { name: "Twitter/X", url: "https://twitter.com/Dager_32" },
    { name: "TikTok", url: "https://www.tiktok.com/@elantrodedager" },
    {
      name: "¿Como centrar un div?",
      url: "https://stackoverflow.com/questions/2281087/center-a-div-in-css",
    },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="h-[10vh] bg-[#ff440075] flex flex-row justify-between items-center shadow-purple-glow">
      <div
        className={`fixed top-[10vh] left-0 w-screen h-screen bg-black bg-opacity-45 z-10
              ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
      >
        <button className="w-screen h-screen" onClick={toggleMenu} />
      </div>
      <div className="mx-10 w-[100%] flex flex-row justify-between items-center">
        <div>
          <img src={iconqb} alt="Logo"
          className="w-[20vh]" />
        </div>
        <div className="flex flex-col">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-black rounded-lg shadow-purple-glow hover:shadow-lumberjack-glow transition-transform duration-300
            hover:cursor-pointer"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`absolute z-50 top-[10vh] right-0 w-[100%] bg-display_menu shadow-profile-glow overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="flex flex-col">
              {list.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  className="hover:shadow-purple-glow"
                >
                  <li className="px-4 py-2 text-qbox hover:bg-qbox hover:text-black hover:cursor-pointer transition-transform duration-300">
                    {item.name}
                  </li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
