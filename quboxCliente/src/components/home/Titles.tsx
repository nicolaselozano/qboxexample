import { TitleCards } from "./TitleCard";

export const Titles = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 md:mx-[10vh] lg:mx-[20vh] justify-center items-center">
      <TitleCards
        title={"Equipos de ejercicio de alta calidad"}
        description={"Nuestro gimnasio está equipado con equipos modernos."}
      />
      <TitleCards
        title={"Entrenadores profesionales"}
        description={"Contamos con expertos que te ayudarán a alcanzar tus metas."}
      />
      <TitleCards
        title={"Ambiente motivador"}
        description={"Un espacio diseñado para que te sientas inspirado."}
      />
    </section>
  );
};
