package com.qbox.googleSheet.config;

import io.github.bucket4j.Bucket;
import io.opencensus.metrics.export.Distribution;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class RateLimitingFilter implements Filter {

    private final ConcurrentMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    private final AppProperties appProperties;

    private Bucket getBucket(String clientId) {
        return buckets.computeIfAbsent(clientId, k ->
                Bucket.builder()
                        .addLimit(limit -> limit.capacity(appProperties.getRatelimitCapacity()).refillGreedy(10, Duration.ofMinutes(10)))
                        .build()
        );
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String clientIp = httpRequest.getRemoteAddr();
        Bucket bucket = getBucket(clientIp);

        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            log.info("client --> {}", httpRequest.getRemoteAddr());
            response.getWriter().write("Too Many Requests");
            response.getWriter().flush();
        }
    }
}
