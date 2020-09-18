package io.zsolt.simplechat.user;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class UserController {
	private UserService service = UserService.getInstance();

	@GetMapping("/users")
	public List<User> getAllUser() {
		return service.getAll();
	}
	
	@GetMapping("/users/{id}")
	public User getUser(@PathVariable String id) {
		return service.get(id);
	}
	
	@PostMapping("/users")
	public void addUser(@RequestBody User user) {
		service.add(user);
	}
}
