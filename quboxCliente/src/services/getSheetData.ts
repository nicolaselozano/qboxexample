import { useEffect, useState } from "react";
import { API_WS_DOMAIN } from "../../vars";

export default function useGoogleSheet() {
  const [messages, setMessages] = useState<string[][]>([]);
  const brokerURL = `${API_WS_DOMAIN}/api/read-sheet`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(brokerURL);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error al leer la hoja:", error);
      }
    };

    fetchData();
  }, [brokerURL]);

  return { messages };
}
