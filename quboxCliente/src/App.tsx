import { useEffect, useState } from "react";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { BackgroundBox } from "./components/background/BackgroundBox";
import { Footer } from "./components/footer/Footer";
import { MasonryGallery } from "./components/gallery/Mansory";
import { TiltEffect } from "./components/gallery/TiltCard";
import Title from "./components/home/ProfileData";
import { Titles } from "./components/home/Titles";
import { Horarios } from "./components/horarios/Horarios";
import Navbar from "./components/navbar/Navbar";
import { ProgramsOptions } from "./components/programsOptions/ProgramsOptions.tsx";
import SplashScreen from "./components/splashScreen/splashScreen";

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
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    async function loadInitialData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.error("Error al cargar datos iniciales", err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  const filteredCards = isMobile ? tailcards.slice(0, 2) : tailcards;

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <section className="flex flex-col justify-between">
      <div rel="preload">
        <BackgroundBox />
        <Navbar />
        <Title />
        <Titles />
      </div>
      <div className="mt-[20vh]">
        <AboutUs />
      </div>
      <div className="mt-10 md:mt-[15vh] lg:mt-[20vh] w-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-qbox">
          Lo que ofrecemos
        </h1>
        <p className="text-lg md:text-2xl lg:text-3xl mt-2">
          Elige el programa que más se adapte a tu objetivo
        </p>
        <ProgramsOptions />
      </div>
      <div className="w-[40vh] md:w-full md:max-w-[1200px] mx-auto flex flex-col justify-center items-center px-4">
        <h3 className="text-qbox text-lg font-bold uppercase mb-10 md:mb-6">
          Galería
        </h3>
        <MasonryGallery
          tailcards={filteredCards.map((card, index) => (
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
        <Horarios />
      </div>
      <div className="mt-[10vh]">
        <Footer />
      </div>
    </section>
  );
}

export default App;
