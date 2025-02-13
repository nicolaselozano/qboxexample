import React, { useState } from "react";
import profilePFP from "../../assets/pngwing.com.png";
import ButtonHome from "../button/ButtonHome";
import Typewriter from "./TypeWriter";
import { TiltEffect } from "../gallery/TiltCard";

const Title: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  const toggleHovered = (set: boolean) => {
    setHovered(set);
  };

  const handleScroll = () => {
    const section = document.getElementById("follow");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full p-4 md:p-10">
      {/* Texto y botones */}
      <div className="text-center mt-[15vh] md:text-left h-[50vh] md:h-[60vh] mb-6 md:mb-0">
        <Typewriter
          sentences={["Acompañamiento profesional", "Mejora tus habitos"]}
        />
        <p className="text-base font-[Noto_Serif] md:text-lg lg:text-[10vh] mt-4">
          Haz una inversion en Ti
        </p>

        <div className="flex justify-center md:justify-start mt-6">
          <ButtonHome classname="border-black w-[20vh] md:w-[25vh] shadow-purple-glow">
            <a onClick={handleScroll}>
              <span>Mas info</span>
            </a>
          </ButtonHome>
          <ButtonHome classname="border-qbox w-[20vh] md:w-[25vh] ml-4 shadow-purple-glow">
            <a onClick={handleScrollContact}>
              <span>Contactanos</span>
            </a>
          </ButtonHome>
        </div>
      </div>
      <div className="relative w-[40vh] h-[40vh]
      md:w-[50vh] md:h-[50vh] lg:w-[210vh] lg:h-[100vh] shadow-profile-glow overflow-hidden
      transform-flat">
          <img
          src={profilePFP}
          alt="Card Image"
          className="absolute inset-0 object-contain w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
};

export default Title;
