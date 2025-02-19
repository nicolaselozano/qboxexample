import { useEffect, useState } from "react";

export const POCard = ({ title, description,imageUrl }) => {
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const directions = [
      "left-[-100%]",
      "right-[-100%]",
      "top-[-100%]",
      "bottom-[-100%]",
    ];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    setDirection(randomDirection);
  }, []);
  return (
    <section
      className="relative w-full h-full p-4 bg-[#0000007a] text-white rounded-sm shadow-lg
    m-3 flex flex-col justify-center items-center
    overflow-hidden group"
    >
      <div
        className="mr-8 ml-3
      z-10"
      >
        <h1 className="text-xl font-bold">{title || "loading..."}</h1>
        <hr />
        <p className="text-sm mt-[7vh]">{description || "loading..."}</p>
      </div>

      <div
        className={`absolute w-full h-full bg-cover bg-center 
                transition-all duration-500 ease-in-out opacity-0 ${direction} 
                group-hover:left-0 group-hover:right-0 group-hover:top-0 group-hover:bottom-0 group-hover:opacity-100`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    </section>
  );
};
