const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
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
          {hours.map((hour) => (
            <tr key={hour} className="">
              <td className="p-3 border border-black bg-black text-white font-bold">
                {hour}
              </td>
              {daysOfWeek.map((day) => (
                <td
                  key={`${day}-${hour}`}
                  className="p-3 border border-black bg-[#ffffff6d] hover:bg-qbox hover:text-white cursor-pointer transition"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
