package io.zsolt.simplechat.message;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class MessageController {
	private MessageService service = MessageService.getInstance();
	
	@GetMapping("/messages")
	public List<Message> getAllMessages() {
		return service.getAllMessages();
	}
	
	@GetMapping("/messages/{userId}")
	public List<Message> getAllMessagesOfUser(@PathVariable String userId) {
		return service.getAllMessagesOfUser(userId);
	}
	
	@PostMapping("/messages")
	public void addMessage(@RequestBody Message message) {
		service.addMessage(message);
	}
	
	@PutMapping("/messages")
	public void updateMessage(@RequestBody Message message) {
		service.updateMessage(message);
	}
}
