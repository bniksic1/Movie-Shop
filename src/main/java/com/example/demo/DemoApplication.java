package com.example.demo;

import com.example.demo.domain.Role;
import com.example.demo.domain.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(roleRepository.findAll().isEmpty()){
			roleRepository.saveAndFlush(new Role(1L, "admin"));
			roleRepository.saveAndFlush(new Role(2L, "user"));
		}

		if(userRepository.findAll().isEmpty()){
			User user1 = new User();
			user1.setEmail("test@user.com");
			user1.setName("Test User");
			user1.setMobile("97874565452");
			user1.setRole(roleRepository.findById(2L).get());
			user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userRepository.saveAndFlush(user1);

			User user2 = new User();
			user2.setEmail("test@admin.com");
			user2.setName("Test Admin");
			user2.setMobile("97874565452");
			user2.setRole(roleRepository.findById(1L).get());
			user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
			userRepository.saveAndFlush(user2);
		}
	}

//	@Bean
//	CommandLineRunner commandLineRunner(MovieRepository movieRepository){
//		return args -> {
//			List<Movie> MOVIES = new ArrayList<>(){
//				{
//					add(new Movie(
//							"Titanic",
//							"Romance",
//							8,
//							"James Cameron",
//							194,
//							new Date(new SimpleDateFormat("yyyy-MM-dd").parse("1997-11-01").getTime()),
//							"The Titanic was a luxury British steamship that sank in the early hours of April 15, 1912 after striking an iceberg, leading to the deaths of more than 1,500 passengers and crew.",
//							"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX182_CR0,0,182,268_AL_.jpg"));
//					add(new Movie(
//							"Pulp Fiction",
//							"Crime",
//							9,
//							"Quentin Tarantino",
//							154,
//							new Date(new SimpleDateFormat("yyyy-MM-dd").parse("1994-10-14").getTime()),
//							"The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
//							"https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR1,0,182,268_AL_.jpg"));
//					add(new Movie(
//							"Fight Club",
//							"Drama",
//							8,
//							"David Fincher",
//							139,
//							new Date(new SimpleDateFormat("yyyy-MM-dd").parse("1995-10-15").getTime()),
//							"An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
//							"https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg"));
//					add(new Movie(
//							"The Shawshank Redemption",
//							"Drama",
//							9,
//							"Frank Darabont",
//							142,
//							new Date(new SimpleDateFormat("yyyy-MM-dd").parse("1994-10-14").getTime()),
//							"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//							"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg"));
//					add(new Movie(
//							"The Godfather",
//							"Crime",
//							9,
//							"Francis Ford Coppola",
//							175,
//							new Date(new SimpleDateFormat("yyyy-MM-dd").parse("1972-03-24").getTime()),
//							"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
//							"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg"));
//				}
//			};
//			for(Movie movie : MOVIES)
//				movieRepository.save(movie);
//		};
//	}

}
