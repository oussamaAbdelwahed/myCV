package iocv.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@EntityScan(basePackages = "iocv.app.beans")
@ComponentScan(basePackages = {"iocv.app.controllers","iocv.app.common","iocv.app.services","iocv.app.config","iocv.app.components","org.springframework.mail"})
@EnableJpaRepositories(basePackages = "iocv.app.repositories")
//@Import(value = {iocv.app.config.WebConfig.class,iocv.app.config.WebConfiguration.class})
//@Import(value = {iocv.app.config.AppUserDetailsService.class,iocv.app.config.WebConfig.class})
@SpringBootApplication
public class AppApplication {
	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}
}
