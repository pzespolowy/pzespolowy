package com.musicweb.musicwebserver.config.persistence;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.musicweb.musicwebserver.repository")
public class PersistenceConfig {

}
