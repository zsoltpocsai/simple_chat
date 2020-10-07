package io.zsolt.simplechat;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@SpringBootApplication
public class App {
	
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(App.class);
		Map<String, Object> defaultProperties = new HashMap<String, Object>();
		
		defaultProperties.put("server.port", System.getenv("PORT"));
		defaultProperties.put("spring.thymeleaf.prefix", "classpath:/client-react/build/");
		defaultProperties.put("spring.resources.static-locations", "classpath:/client-react/build/");
		
		app.setDefaultProperties(defaultProperties);
		app.run(args);
	}
	
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.requiresChannel()
//			.requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null)
//			.requiresSecure();
//	}
}
