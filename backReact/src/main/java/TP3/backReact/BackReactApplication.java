package TP3.backReact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("backReact")
public class BackReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackReactApplication.class, args);
		System.out.println("------La aplicacion se lanzo correctamente------");

	}

}
