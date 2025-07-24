package com.qbox.googleSheet.config;

import com.qbox.googleSheet.filter.auth.JwtAuthenticationFilter;
import com.qbox.googleSheet.utils.AESUtil;
import com.qbox.googleSheet.utils.CreateCookie;
import com.qbox.googleSheet.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final JwtTokenUtil jwtUtil;
    private final AESUtil aesUtil;
    private OAuth2AuthorizedClientService authorizedClientService;

    private final AppConfig appConfig;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/api/v*/registration/**",
                                "/actuator/**",
                                "/ws-update",
                                "/ws/**",
                                "/topic/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    private void handleOAuth2Success(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        try {
            System.out.println("✅ OAuth2 Success Handler triggered!");

            DefaultOAuth2User oauthUser = (DefaultOAuth2User) authentication.getPrincipal();
            String email = oauthUser.getAttribute("email");
            String name = oauthUser.getAttribute("name");

            OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
            OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                    authToken.getAuthorizedClientRegistrationId(),
                    authToken.getName()
            );

            if (email == null || name == null) {
                throw new IllegalArgumentException("Email or Name is null in OAuth2 response");
            }

            if (authorizedClient == null || authorizedClient.getAccessToken() == null) {
                throw new IllegalArgumentException("Access Token is missing!");
            }

            String googleAccessToken = authorizedClient.getAccessToken().getTokenValue();

            String jwt = jwtUtil.generateToken(email, googleAccessToken);

            String encryptedToken = URLEncoder.encode(aesUtil.encrypt(jwt), StandardCharsets.UTF_8);
            String encryptedEmail = URLEncoder.encode(aesUtil.encrypt(email), StandardCharsets.UTF_8);
            String encryptedName = URLEncoder.encode(aesUtil.encrypt(name), StandardCharsets.UTF_8);

            response.setHeader(HttpHeaders.SET_COOKIE, CreateCookie.auth(encryptedToken).toString());
            response.addHeader(HttpHeaders.SET_COOKIE, CreateCookie.cookie("email", encryptedEmail).toString());
            response.addHeader(HttpHeaders.SET_COOKIE, CreateCookie.cookie("username", encryptedName).toString());

            System.out.println("✅ JWT, Email y Nombre almacenados en cookies");

            boolean isDevelop = appConfig.getProperty("ENVIRONMENT").equalsIgnoreCase("develop");

            String redirectUrl = isDevelop ? "/oauth2/success" : "/oauth2/success";
            System.out.println(redirectUrl);
            response.sendRedirect(redirectUrl.trim() + "?token=" + encryptedToken + "&email=" + encryptedEmail + "&name=" + encryptedName);

        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Authentication failed: " + e.getMessage());
        }
    }


    private void handleOAuth2Failure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"error\": \"Login failed\", \"message\": \"" + exception.getMessage() + "\"}");
        response.getWriter().flush();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        boolean isSecure = Boolean.parseBoolean(appConfig.getProperty("COOKIE_SECURE"));

        corsConfiguration.setAllowedOrigins(List.of(appConfig.getProperty("CLIENT_ORIGIN")));
        corsConfiguration.setAllowedMethods(isSecure ? List.of("GET", "POST", "UPDATE") : List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
