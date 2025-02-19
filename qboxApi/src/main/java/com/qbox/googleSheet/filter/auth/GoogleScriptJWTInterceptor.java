package com.qbox.googleSheet.filter.auth;

import com.qbox.googleSheet.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class GoogleScriptJWTInterceptor implements HandlerInterceptor {

    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                if (jwtTokenUtil.validateToken(token)) {
                    String sheetName = jwtTokenUtil.extractStringClaim(token, "sheetName");
                    System.out.println("✅ Token válido para la hoja: " + sheetName);
                    return true;
                }
            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token inválido: " + e.getMessage());
                return false;
            }
        }

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No se encontró un token válido.");
        return false;
    }
}
