import React, { useState } from "react";
import useWebSocket from "./useWebSocket";

export function HubHorarios() {
  const { messages, client } = useWebSocket(); // ✅ Ahora obtenemos el cliente
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (client && client.connected) {
      client.publish({ destination: "/app/sendMessage", body: message });
    } else {
      console.error("No se puede enviar el mensaje: WebSocket desconectado");
    }
  };

  return (
    <div>
      <h1>Chat WebSocket con STOMP</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Enviar</button>

      <h2>Mensajes Recibidos:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
