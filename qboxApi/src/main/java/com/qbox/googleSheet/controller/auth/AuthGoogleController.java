package com.qbox.googleSheet.controller.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.qbox.googleSheet.config.AppConfig;
import com.qbox.googleSheet.utils.CreateCookie;
import com.qbox.googleSheet.utils.JwtTokenUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/oauth2")
@AllArgsConstructor
public class AuthGoogleController {
    private final AppConfig appConfig;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/success")
    public ResponseEntity<?> success(@RequestParam String token,
                                     @RequestParam(required = false) String email,
                                     @RequestParam(required = false) String name) throws Exception {
        System.out.println("Token recibido en el controlador de callback: " + token);

        String encryptedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);

        return ResponseEntity.status(302)
                .header(HttpHeaders.LOCATION, appConfig.getProperty("CLIENT_API"))
                .header(HttpHeaders.SET_COOKIE, CreateCookie.auth(encryptedToken).toString())
                .build();
    }

    @PostMapping("/exchange")
    public ResponseEntity<?> exchangeToken(@RequestBody Map<String, String> request) {
        String googleToken = request.get("token");

        if (googleToken == null) {
            return ResponseEntity.badRequest().body("Token is required");
        }

        try {
            GoogleIdToken idToken = verifyGoogleToken(googleToken);

            if (idToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
            }

            String email = idToken.getPayload().getEmail();

            String jwt = jwtTokenUtil.generateToken(email, null);

            return ResponseEntity.ok(Collections.singletonMap("jwt", jwt));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error verifying token");
        }
    }

    private GoogleIdToken verifyGoogleToken(String token) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(appConfig.getProperty("GOOGLE_CLIENT_ID")))
                    .build();

            return verifier.verify(token);
        } catch (Exception e) {
            return null;
        }
    }
}