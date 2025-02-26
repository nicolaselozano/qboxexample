package com.qbox.googleSheet.hub;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/ws-update")
public class GoogleSheetsWebhookController {
    private final SheetWebSocketHandler webSocketHandler;

    @PostMapping
    public ResponseEntity<Map<String, Object>> handleGoogleSheetsUpdate(@RequestBody Map<String, Object> payload) {
        System.out.println("📩 Datos recibidos desde Google Sheets: " + payload);

        Object data = payload.get("data");

        System.out.println("📩 Data: " + data);

        return ResponseEntity.ok(Map.of("data", data));
    }

    @MessageMapping("/sendMessage")  // 🔥 El cliente enviará mensajes aquí ("/app/sendMessage")
    @SendTo("/topic/messages")  // 🔥 Se enviarán a todos los suscriptores de "/topic/messages"
    public String sendMessage(String message) {
        return message;  // 🔄 Simplemente reenvía el mensaje
    }
}
