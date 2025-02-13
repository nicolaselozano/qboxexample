export const MansoryGallery = ({ tailcards }) => {
    console.log("MansoryGallery received tailcards:", tailcards);
  
    if (!tailcards || tailcards.length === 0) {
      return <p className="text-center text-gray-500">No cards available.</p>;
    }
  
    // Agrupamos las imágenes en columnas para lograr el efecto Masonry
    const columns = [[], [], [], []]; // 4 columnas para distribución
  
    tailcards.forEach((card, index) => {
      columns[index % 4].push(card);
    });
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="grid gap-4">
            {column.map((card, index) => (
              <div key={index} className="w-full h-auto flex items-center
              bg-qbox/15 rounded-2xl">
                {card}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  