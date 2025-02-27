package com.qbox.googleSheet.hub;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/ws-update")
public class GoogleSheetsWebhookController {

    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<Map<String, Object>> handleGoogleSheetsUpdate(@RequestBody Map<String, Object> payload) {
        System.out.println("Datos recibidos desde Google Sheets: " + payload);
        Object data = payload.get("data");
        messagingTemplate.convertAndSend("/topic/updates", data);
        return ResponseEntity.ok(Map.of("data", data));
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        return "Mensaje recibido: " + message;
    }
}
