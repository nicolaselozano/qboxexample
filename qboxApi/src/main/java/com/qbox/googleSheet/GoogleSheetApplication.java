package com.qbox.googleSheet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.qbox.googleSheet")
public class GoogleSheetApplication {
	public static void main(String[] args) {
		System.out.println("QBOX API");
		SpringApplication.run(GoogleSheetApplication.class, args);
	}
}

