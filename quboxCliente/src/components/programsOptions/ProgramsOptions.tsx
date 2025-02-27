import { POCard } from "./POCard";

export const ProgramsOptions = () => {
  const optionList = [
    {
      title: "Musculación",
      description: "Entrenamiento con pesas para ganar fuerza y masa muscular.",
      image:
        "https://doblefit.com/wp-content/uploads/2023/10/Banco-musculacion-ajustable-Doblefit.jpg",
    },
    {
      title: "Spinning",
      description:
        "Clases de ciclismo indoor de alta intensidad para mejorar resistencia y quemar calorías.",
      image:
        "https://farmazara.es/blog/wp-content/uploads/2023/07/gente-haciendo-ciclismo-indoor.jpg",
    },
    {
      title: "CrossFit",
      description:
        "Ejercicios funcionales de alta intensidad para mejorar fuerza, resistencia y agilidad.",
      image:
        "https://workoutbrands.com/cdn/shop/articles/crossfit-together.png?v=1713161828&width=2048",
    },
    {
      title: "Yoga",
      description:
        "Sesiones enfocadas en la flexibilidad, equilibrio y relajación mental.",
      image:
        "https://eu.manduka.com/cdn/shop/articles/newotyoga_2048x2048.jpg?v=1735914425",
    },
    {
      title: "HIIT",
      description:
        "Entrenamientos cortos e intensos para quemar grasa y mejorar el acondicionamiento físico.",
      image:
        "https://images.contentstack.io/v3/assets/blt45c082eaf9747747/blt66fdedb53cb8d5bc/5fdd0000a703d10ab87e8291/HIIT.jpg?format=pjpg&auto=webp&quality=76&width=1232",
    },
    {
      title: "Funcional",
      description:
        "Entrenamientos dinámicos y variados que mejoran el rendimiento general.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqoTUY3pJUPJFfDYictUBgeP0wwim0kOYqOg&s",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 md:m-6 lg:m-[10vh]">
      {optionList.map((option, index) => (
        <div key={index} className="relative w-full max-w-[60vh] h-auto mx-auto">
          <span className="absolute top-0 -right-5 h-4 w-4 animate-ping rounded-full bg-qbox opacity-75"></span>
          <POCard
            title={option.title}
            description={option.description}
            imageUrl={option.image}
          />
        </div>
      ))}
    </section>
  );
  
};
