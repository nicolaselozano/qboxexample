import React from "react";
import logoQbox from "../../assets/qboxLogo_1.webp";

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#292929]">
      <img
        src={logoQbox}
        alt="Qbox Logo"
        className="animate-pulse w-20 h-20 mb-5"
      />
      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"/>
    </div>
  );
};

export default SplashScreen;
