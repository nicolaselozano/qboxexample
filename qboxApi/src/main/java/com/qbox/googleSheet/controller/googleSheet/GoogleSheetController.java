package com.qbox.googleSheet.controller.googleSheet;

import com.qbox.googleSheet.config.AppConfig;
import com.qbox.googleSheet.service.GoogleSheetService;
import com.qbox.googleSheet.utils.AESUtil;
import com.qbox.googleSheet.utils.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class GoogleSheetController {

    private final GoogleSheetService googleSheetsService;
    private final SimpMessagingTemplate messagingTemplate;
    private final AppConfig appConfig;

    @GetMapping("/read-sheet")
    public List<List<Object>> readGoogleSheet()
            throws IOException, GeneralSecurityException {
        try {
            String spreadsheetId = appConfig.getProperty("SPREADSHEETID");
            String range = appConfig.getProperty("RANGE");
            messagingTemplate.convertAndSend("/topic/updates", googleSheetsService.getSheetData(spreadsheetId, range));
            return googleSheetsService.getSheetData(spreadsheetId, range);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
