import { TitleCards } from "./TitleCard";

export const Titles = () => {
  return (
    <section className="flex flex-row mx-[20vh] justify-center items-center">
      <TitleCards
        title={"Equipos de ejercicio de alta calidad"}
        description={"Nuestro gimnasio está equipado con equipos modernos."}
      />
      <TitleCards
        title={"Equipos de ejercicio de alta calidad"}
        description={"Nuestro gimnasio está equipado con equipos modernos."}
      />{" "}
      <TitleCards
        title={"Equipos de ejercicio de alta calidad"}
        description={"Nuestro gimnasio está equipado con equipos modernos."}
      />
    </section>
  );
};
