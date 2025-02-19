package com.qbox.googleSheet.config;

import com.qbox.googleSheet.filter.auth.GoogleScriptJWTInterceptor;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@AllArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final GoogleScriptJWTInterceptor googleScriptJWTInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(googleScriptJWTInterceptor)
                .addPathPatterns("/ws-update");
    }
}
