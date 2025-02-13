package com.qbox.googleSheet.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@ConfigurationProperties(prefix = "app")
public class AppConfig  {

    private final Environment env;

    public AppConfig(Environment env) {
        this.env = env;
    }

    public String getProperty(String key) {
        return env.getProperty(key);
    }

    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
