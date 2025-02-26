import { AboutUs } from "./components/aboutUs/AboutUs";
import { BackgroundBox } from "./components/background/BackgroundBox";
import { MasonryGallery } from "./components/gallery/Mansory";
import { TiltEffect } from "./components/gallery/TiltCard";
import Title from "./components/home/ProfileData";
import { Titles } from "./components/home/Titles";
import { Horarios } from "./components/horarios/Horarios";
import { HubHorarios } from "./components/hub/HubHorarios";
import Navbar from "./components/navbar/Navbar";
import { ProgramsOptions } from "./components/programsOptions/ProgramsOptions";

function App() {
  const tailcards = [
    {
      title: "Card 2",
      image:
        "https://www.fitactiva.com/wp-content/uploads/2022/11/dias-entrenar.png",
      description: "A .",
    },
    {
      title: "Card 3",
      image:
        "https://www.fitactiva.com/wp-content/uploads/2022/11/dias-entrenar.png",
      description: "A cute  image.",
    },
    {
      title: "Card 4",
      image:
        "https://i.pinimg.com/236x/37/66/e6/3766e6d63556c2c339706f0a4f9d8dd4.jpg",
      description: "A cut image.",
    },
    {
      title: "Card 3",
      image:
        "https://www.fitactiva.com/wp-content/uploads/2022/11/dias-entrenar.png",
      description: "A cute  image.",
    },
    {
      title: "Card 4",
      image:
        "https://i.pinimg.com/236x/37/66/e6/3766e6d63556c2c339706f0a4f9d8dd4.jpg",
      description: "A cut image.",
    },
    {
      title: "Card 3",
      image:
        "https://www.fitactiva.com/wp-content/uploads/2022/11/dias-entrenar.png",
      description: "A cute  image.",
    },
    {
      title: "Card 4",
      image:
        "https://img.freepik.com/foto-gratis/atleta-haciendo-flexiones-gimnasio-estilo-vida-deportivo-torso-desnudo_169016-60920.jpg",
      description: "A cut image.",
    },
    {
      title: "Card 3",
      image:
        "https://www.fitactiva.com/wp-content/uploads/2022/11/dias-entrenar.png",
      description: "A cute  image.",
    },
    {
      title: "Card 4",
      image:
        "https://i.pinimg.com/236x/37/66/e6/3766e6d63556c2c339706f0a4f9d8dd4.jpg",
      description: "A cut image.",
    },
  ];

  return (
    <section className="flex flex-col justify-between">
      <div>
        <BackgroundBox />
        <Navbar />
        <Title />
        <Titles/>
        <HubHorarios/>
      </div>
      <div className="mt-[20vh]">
        <AboutUs/>
      </div>
      <div className="mt-[20vh] w-full flex flex-col justify-center items-center">
      <h1 className="text-[7vh] font-bold text-qbox">Lo que ofrecemos</h1>
      <p className="text-[3vh]">Elije el programa que mas se adapte a tu objetivo</p>
        <ProgramsOptions/>
      </div>
      <div className="w-[150vh] mx-auto flex flex-col justify-center items-center">
      <h3 className="text-[#ff4200] text-lg font-bold uppercase mb-10">Galeria</h3>
        <MasonryGallery
          tailcards={tailcards.map((card, index) => (
            <TiltEffect
              image={card.image}
              key={index}
              className="w-full h-auto"
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-auto max-w-full rounded-lg object-cover"
              />
            </TiltEffect>
          ))}
        />
      </div>
      <div className="m-4">
        <Horarios/>
      </div>
    </section>
  );
}

export default App;
