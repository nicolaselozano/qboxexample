import { useEffect, useState } from "react";

const Typewriter = ({ sentences }) => {
  const [displayText, setDisplayText] = useState(sentences[0]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setFade(false);
    }, 4500);

    const changeTextTimeout = setTimeout(() => {
      const nextPhraseIndex = (currentPhraseIndex + 1) % sentences.length;
      setDisplayText(sentences[nextPhraseIndex]);
      setCurrentPhraseIndex(nextPhraseIndex);
      setFade(true);
    }, 5000);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(changeTextTimeout);
    };
  }, [currentPhraseIndex, sentences]);

  return (
    <h1
      className={`text-2xl font-bold text-qbox transition-opacity duration-500 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {displayText}
    </h1>
  );
};

export default Typewriter;
