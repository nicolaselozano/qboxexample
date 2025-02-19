import { CgGym } from "react-icons/cg";

export const TitleCards = ({ title, description }) => {
  return (
    <section
      className="relative w-full p-4 bg-[#0000007a] text-white rounded-xl shadow-lg
    m-3
    transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
    >
      <div className="absolute top-3 right-3 text-qbox text-5xl">
        <CgGym />
      </div>
      <div className="mr-8 ml-3">
        <h1 className="text-xl font-bold">{title || "loading..."}</h1>
        <p className="text-sm">{description || "loading..."}</p>
      </div>
    </section>
  );
};
