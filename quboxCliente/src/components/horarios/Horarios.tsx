import horariosData from "../../data/horariosData.json";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const formatTime = (timeString) => {
  if (!timeString) return "";
  const date = new Date(timeString);
  let hours = date.getHours();

  return `${hours}:00`;
};

const hours = Array.from({ length: 12 }, (_, i) => `${9 + i}:00`);

export const Horarios = () => {
  return (
    <div className="flex justify-center mt-10 rounded-xl">
      <table
        className=" text-center overflow-hidden
      w-full p-4 bg-[#0000007a] text-white rounded-xl shadow-lg
    m-3"
      >
        <thead>
          <tr className="bg-qbox text-black">
            <th className="p-3 border border-black">Hora</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="p-3 border border-black">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horariosData.data.slice(1, horariosData.data.length).map((fila) => (
            <tr>
              <td className="p-3 border border-black bg-black text-white font-bold">
                {formatTime(fila[0] || "")}
              </td>
              {fila.slice(1, daysOfWeek.length+1).map((value) => (
                <td className="p-3 border border-black bg-[#ffffff6d] hover:bg-qbox hover:text-white cursor-pointer transition">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
