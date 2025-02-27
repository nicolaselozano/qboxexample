import { useEffect, useState } from "react";
import horariosData from "../../data/horariosData.json";
import useWebSocket from "../hub/useWebSocket";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const formatTime = (timeString) => {
  if (!timeString) return "";
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const Horarios = () => {
  const [horarios, setHorarios] = useState({ data: horariosData.data });
  const { messages } = useWebSocket();

  useEffect(() => {
    if (messages.length > 0) {
      try {
        const nuevoHorario = JSON.parse(messages[messages.length - 1]);
        console.log("Nuevo horario recibido:", nuevoHorario);
        setHorarios({ data: nuevoHorario });
      } catch (error) {
        console.error("Error al procesar nuevo horario:", error);
      }
    }
  }, [messages]);

  return (
<div className="flex w-full justify-center mt-10 rounded-xl overflow-x-auto">
  <div className="w-full max-w-[90vw] ">
    <table className="min-w-max w-full text-center bg-[#0000007a] text-white rounded-xl shadow-lg m-3 whitespace-nowrap">
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
        {horarios.data.slice(1).map((fila, index) => (
          <tr key={index}>
            <td className="p-3 border border-black bg-black text-white font-bold">
              {formatTime(fila[0] || "")}
            </td>
            {fila.slice(1, daysOfWeek.length + 1).map((value, i) => (
              <td
                key={i}
                className="p-3 border border-black bg-[#ffffff6d] hover:bg-qbox hover:text-white cursor-pointer transition"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};
