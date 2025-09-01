package com.payeasy.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PayeasyApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(PayeasyApiGatewayApplication.class, args);
	}

}
