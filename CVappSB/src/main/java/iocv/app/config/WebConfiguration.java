package iocv.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
@Configuration
public class WebConfiguration extends WebMvcConfigurationSupport {

    /*public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/**").addResourceLocations("classpath:/main/resources/static/");
    }*/

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
       System.err.println("addResourceHandlers declenched");
       //if (!registry.hasMappingForPattern("/**")) {
            registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
        //}
    }
}
