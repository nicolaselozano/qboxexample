import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { API_WS_DOMAIN } from "../../../vars";

export default function useWebSocket() {
  const [messages, setMessages] = useState<string[]>([]);
  const [client] = useState(() => new Client({ brokerURL: `${API_WS_DOMAIN}/ws`,
    connectHeaders: {
      withCredentials: "true"
    },
    reconnectDelay: 20000 }));

    useEffect(() => {
      client.onConnect = () => {
        console.log("Conectado al WebSocket");
    
        client.publish({ destination: "/app/requestLatestData" });
    
        client.subscribe("/topic/updates", (message) => {
          console.log("actualizando", message.body);
          setMessages((prev) => [...prev, message.body]);
        });
      };
    
      client.onDisconnect = () => console.log("Desconectado del WebSocket");
      client.onStompError = (frame) => console.error("Error STOMP:", frame);
    
      client.activate();
    
      return () => {
        client.deactivate();
      };
    }, [client]);
    

  return { messages, client };
}
