import { TiltEffect } from "./TiltCard";

interface MasonryGalleryProps {
  tailcards: React.ReactNode[];
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  tailcards,
}) => {
  console.log("MansoryGallery received tailcards:", tailcards);

  if (!tailcards || tailcards.length === 0) {
    return <p className="text-center text-gray-500">No cards available.</p>;
  }

  const columns = [[], [], [], []];

  tailcards.forEach((card, index) => {
    columns[index % 4].push(card);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {column.map((card, index) => (
            <div
              key={index}
              className="w-full h-full flex items-center justify-center bg-qbox/15 rounded-2xl overflow-hidden"
            >
              <TiltEffect className="">{card}</TiltEffect>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
