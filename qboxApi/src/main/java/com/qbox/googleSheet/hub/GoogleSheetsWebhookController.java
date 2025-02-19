package com.qbox.googleSheet.hub;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/ws-update")
public class GoogleSheetsWebhookController {
    private final SheetWebSocketHandler webSocketHandler;


    @PostMapping
    public ResponseEntity<Map<String, String>> handleGoogleSheetsUpdate(@RequestBody Map<String, Object> payload) {
        System.out.println("📩 Datos recibidos desde Google Sheets: " + payload);

        return ResponseEntity.ok(Map.of("status", "success", "message", "Datos recibidos correctamente"));

    }
}
