package com.payeasy.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class PayeasyEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PayeasyEurekaServerApplication.class, args);
	}

}
