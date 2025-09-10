package com.oracle.config;


//import com.oracle.repository.ChartDataRepository;
import com.oracle.repository.UserChartDataRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    private final UserChartDataRepository chartDataRepository;

    CorsConfig(UserChartDataRepository chartDataRepository) {
        this.chartDataRepository = chartDataRepository;
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer () {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
            	registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");

            }
        };
    }
}