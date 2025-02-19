package com.qbox.googleSheet.filter.auth;

import com.qbox.googleSheet.utils.AESUtil;
import com.qbox.googleSheet.utils.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    private final AESUtil aesUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        System.out.println("🔍 Checking authentication token...");
        String token = null;
        try {
            token = extractToken(request);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        if (token != null) {
            try {

                if (jwtTokenUtil.validateToken(token)) {
                    String username = jwtTokenUtil.extractEmail(token);
                    System.out.println("Valid token for user: " + username);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    System.out.println("Invalid token");
                }
            } catch (Exception e) {
                System.out.println("Token processing error: " + e.getMessage());
            }
        }

        chain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) throws Exception {
        String headerToken = request.getHeader("Authorization");
        if (headerToken != null && headerToken.startsWith("Bearer ")) {
            return headerToken.substring(7);
        }

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    System.out.println(cookie.getName() + cookie.getValue());
                    System.out.println("🔓 Decrypting token...");
                    return aesUtil.decrypt(URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8));
                }
            }
        }

        return null;
    }
}
