package com.qbox.googleSheet.controller;

import com.qbox.googleSheet.config.AppConfig;
import com.qbox.googleSheet.utils.AESUtil;
import com.qbox.googleSheet.utils.CreateCookie;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/oauth2")
@AllArgsConstructor
public class AuthGoogleController {
    private final AESUtil aesUtil;
    private final AppConfig appConfig;

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
}