import { CgGym } from "react-icons/cg";

export const TitleCards = ({ title, description }) => {
  return (
    <section
      className="relative w-full max-w-sm h-36 p-6 bg-[#0000007a] text-white rounded-xl shadow-lg
      flex flex-col justify-between
      m-auto transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
    >
      <div className="absolute top-3 right-3 text-qbox text-4xl">
        <CgGym />
      </div>
      <div className="mr-8 ml-3">
        <h1 className="text-lg md:text-xl font-bold">{title || "loading..."}</h1>
        <p className="text-sm md:text-base">{description || "loading..."}</p>
      </div>
    </section>
  );
};
