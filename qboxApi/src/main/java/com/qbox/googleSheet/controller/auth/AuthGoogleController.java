//package com.qbox.googleSheet.controller.auth;
//
//import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
//import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
//import com.google.api.client.http.javanet.NetHttpTransport;
//import com.google.api.client.json.gson.GsonFactory;
//import com.qbox.googleSheet.config.AppConfig;
//import com.qbox.googleSheet.utils.AESUtil;
//import com.qbox.googleSheet.utils.CreateCookie;
//import com.qbox.googleSheet.utils.JwtTokenUtil;
//import lombok.AllArgsConstructor;
//import org.springframework.http.*;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.bind.annotation.*;
//
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.util.Collections;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/oauth2")
//@AllArgsConstructor
//public class AuthGoogleController {
//    private final AppConfig appConfig;
//    private final JwtTokenUtil jwtTokenUtil;
//    private final AESUtil aesUtil;
//
//    @GetMapping("/success")
//    public ResponseEntity<?> success(@RequestParam String token,
//                                     @RequestParam(required = false) String email,
//                                     @RequestParam(required = false) String name) throws Exception {
//        String encryptedToken = URLEncoder.encode(token, StandardCharsets.UTF_8);
//        String encryptedEmail = email != null ? URLEncoder.encode(email, StandardCharsets.UTF_8) : "";
//        String encryptedName = name != null ? URLEncoder.encode(name, StandardCharsets.UTF_8) : "";
//
//        return ResponseEntity.status(302)
//                .header(HttpHeaders.LOCATION, appConfig.getProperty("CLIENT_API"))
//                .header(HttpHeaders.SET_COOKIE, CreateCookie.auth(encryptedToken).toString())
//                .header(HttpHeaders.SET_COOKIE, CreateCookie.cookie("email",encryptedEmail).toString())
//                .header(HttpHeaders.SET_COOKIE, CreateCookie.cookie("username",encryptedName).toString())
//                .build();
//    }
//
//    @PostMapping("/exchange")
//    public ResponseEntity<?> exchangeToken(@RequestBody Map<String, String> request) {
//        String googleToken = request.get("token");
//
//        if (googleToken == null) {
//            return ResponseEntity.badRequest().body("Token is required");
//        }
//
//        try {
//            GoogleIdToken idToken = verifyGoogleToken(googleToken);
//
//            if (idToken == null) {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
//            }
//
//            String email = idToken.getPayload().getEmail();
//
//            String jwt = jwtTokenUtil.generateToken(email, null);
//
//            return ResponseEntity.ok(Collections.singletonMap("jwt", jwt));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error verifying token");
//        }
//    }
//
//    private GoogleIdToken verifyGoogleToken(String token) {
//        try {
//            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
//                    new NetHttpTransport(), GsonFactory.getDefaultInstance())
//                    .setAudience(Collections.singletonList(appConfig.getProperty("GOOGLE_CLIENT_ID")))
//                    .build();
//            return verifier.verify(token);
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/check")
//    public ResponseEntity<?> checkAndGetData(
//            @RequestParam(required = false, defaultValue = "false") String clearCookie,
//            @CookieValue(value = "jwt", required = false) String jwtCookie,
//            @CookieValue(value = "email", required = false) String emailCookie,
//            @CookieValue(value = "username", required = false) String nameCookie) {
//
//        System.out.println(" ⚠ Varificando ⚠");
//
//        if (Boolean.parseBoolean(clearCookie)) {
//            ResponseCookie clearJwtCookie = ResponseCookie.from("jwt", "").path("/").maxAge(0).httpOnly(true).build();
//            ResponseCookie clearEmailCookie = ResponseCookie.from("email", "").path("/").maxAge(0).httpOnly(true).build();
//            ResponseCookie clearNameCookie = ResponseCookie.from("username", "").path("/").maxAge(0).httpOnly(true).build();
//
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.SET_COOKIE, clearJwtCookie.toString())
//                    .header(HttpHeaders.SET_COOKIE, clearEmailCookie.toString())
//                    .header(HttpHeaders.SET_COOKIE, clearNameCookie.toString())
//                    .body(" ✅ Cookies eliminadas");
//        }
//
//        try {
//            String decryptedEmail = emailCookie != null ? aesUtil.decrypt(emailCookie) : "No email cookie";
//            String decryptedName = nameCookie != null ? aesUtil.decrypt(nameCookie) : "No name cookie";
//
//            ResponseMessage response = new ResponseMessage(
//                    decryptedEmail,
//                    decryptedName
//            );
//
//            return ResponseEntity.ok(response);
//
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error al desencriptar las cookies: " + e.getMessage());
//        }
//    }
//}