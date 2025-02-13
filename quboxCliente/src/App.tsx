import "./App.css";
import { BackgroundBox } from "./components/background/BackgroundBox";
import { CarruselLanding } from "./components/carrusel/Carrusel";
import { MansoryGallery } from "./components/gallery/Mansory";
import { TiltEffect } from "./components/gallery/TiltCard";
import Title from "./components/home/ProfileData";
import Navbar from "./components/navbar/Navbar";

function App() {
  const tailcards = [
    {
      title: "Card 1",
      image: "https://ethic.es/wp-content/uploads/2023/03/imagen.jpg",
      description: "Description for Card 1.",
    },
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
  ];

  return (
    <>
      <BackgroundBox />
      <Navbar />
      <Title />
      <CarruselLanding />

      {console.log("Rendering MansoryGallery with tailcards:", tailcards)}

      <MansoryGallery
        tailcards={tailcards.map((card, index) => (
          <TiltEffect image={card.image} key={index} className="w-full h-auto">
            <img
              src={card.image}
              alt={card.title}
              className="h-auto max-w-full rounded-lg object-cover"
            />
          </TiltEffect>
        ))}
      />
    </>
  );
}

export default App;
