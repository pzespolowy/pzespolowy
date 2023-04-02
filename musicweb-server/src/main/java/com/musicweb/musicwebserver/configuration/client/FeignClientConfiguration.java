package com.musicweb.musicwebserver.configuration.client;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.musicweb.musicwebserver.client")
public class FeignClientConfiguration {
}
