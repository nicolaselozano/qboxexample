package com.qbox.googleSheet.controller;

import com.qbox.googleSheet.service.GoogleSheetService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@AllArgsConstructor
public class GoogleSheetController {

    private final GoogleSheetService googleSheetsService;

    @GetMapping("/read-sheet")
    public List<List<Object>> readGoogleSheet(
            @RequestParam String spreadsheetId,
            @RequestParam String range,
            @RequestHeader("Authorization") String token)
            throws IOException, GeneralSecurityException {

        String accessToken = token.replace("Bearer ", "");
        return googleSheetsService.getSheetData(spreadsheetId, range, accessToken);
    }
}
