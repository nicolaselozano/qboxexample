package com.qbox.googleSheet.hub;

import com.qbox.googleSheet.config.AppConfig;
import com.qbox.googleSheet.service.GoogleSheetService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/ws-update")
public class GoogleSheetsWebhookController {

    private final SimpMessagingTemplate messagingTemplate;
    private final GoogleSheetService googleSheetService;
    private final AppConfig appConfig;

    @PostMapping
    public ResponseEntity<Map<String, Object>> handleGoogleSheetsUpdate(@RequestBody Map<String, Object> payload) {
        System.out.println("Datos recibidos desde Google Sheets: " + payload);
        Object data = payload.get("data");
        log.info("Mandando datos al cliente");
        messagingTemplate.convertAndSend("/topic/updates", data);
        return ResponseEntity.ok(Map.of("data", data));
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        return "Mensaje recibido: " + message;
    }

    @SubscribeMapping("/topic/updates")
    public List<List<Object>> sendLastDataOnSubscribe() throws IOException, GeneralSecurityException {
        log.info("suscribiendo y tomando datos del spreadsheet");
        String spreadsheetId = appConfig.getProperty("SPREADSHEETID");
        String range = appConfig.getProperty("RANGE");
        return googleSheetService.getSheetData(spreadsheetId, range);
    }

    @MessageMapping("/requestLatestData")
    public void sendLatestDataOnRequest() throws IOException, GeneralSecurityException {
        System.out.println("Cliente solicitó los últimos datos del spreadsheet");
        String spreadsheetId = appConfig.getProperty("SPREADSHEETID");
        String range = appConfig.getProperty("RANGE");
        List<List<Object>> data = googleSheetService.getSheetData(spreadsheetId, range);

        messagingTemplate.convertAndSend("/topic/updates", data);
    }

}
