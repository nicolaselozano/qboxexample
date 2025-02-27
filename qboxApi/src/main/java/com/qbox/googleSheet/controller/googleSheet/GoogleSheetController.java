package com.qbox.googleSheet.controller.googleSheet;

import com.qbox.googleSheet.service.GoogleSheetService;
import com.qbox.googleSheet.utils.AESUtil;
import com.qbox.googleSheet.utils.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@AllArgsConstructor
public class GoogleSheetController {

    private final GoogleSheetService googleSheetsService;
    private final AESUtil aesUtil;
    private final JwtTokenUtil jwtTokenUtil;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/read-sheet")
    public List<List<Object>> readGoogleSheet(
            @RequestParam String spreadsheetId,
            @RequestParam String range,
            @CookieValue(value = "jwt", required = false) String jwtCookie)
            throws IOException, GeneralSecurityException {
        try {

            String decryptedToken = URLDecoder.decode(aesUtil.decrypt(jwtCookie), StandardCharsets.UTF_8);
            String googleToken = jwtTokenUtil.extractStringClaim(decryptedToken,"access_token");
            messagingTemplate.convertAndSend("/topic/updates", googleSheetsService.getSheetData(spreadsheetId, range, googleToken));
            return googleSheetsService.getSheetData(spreadsheetId, range, googleToken);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
