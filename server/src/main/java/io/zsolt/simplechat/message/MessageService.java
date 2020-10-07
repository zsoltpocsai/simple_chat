package io.zsolt.simplechat.message;

import java.util.List;

import io.zsolt.simplechat.user.User;
import io.zsolt.simplechat.user.UserDAO;

public class MessageService {
	public static MessageService instance;
	private MessageDAO messageDAO;
	private UserDAO userDAO;
	
	private MessageService() {
		messageDAO = MessageDAO.getInstance();
		userDAO = UserDAO.getInstance();
	}
	
	public static MessageService getInstance() {
		if (instance == null) {
			instance = new MessageService();
		}
		return instance;
	}
	
	public List<Message> getAllMessages() {
		return messageDAO.getAll();
	}
	
	public List<Message> getAllMessagesOfUser(String userId) {
		return messageDAO.getAllOfUser(userId);
	}
	
	public void addMessage(Message message) {
		User sender = message.getSender();
		User recipient = message.getRecipient();
		
		// replaces the newly created User object references with the 
		// existing ones
		message.setSender(userDAO.getUser(sender.getId()));
		message.setRecipient(userDAO.getUser(recipient.getId()));
		
		messageDAO.add(message);
		
		// for log
//		ObjectMapper mapper = new ObjectMapper();
//		try {
//			System.out.println("Message received: " + mapper.writeValueAsString(message));
//		} catch (Exception e) {}
	}
	
	public void updateMessage(Message message) {
		messageDAO.update(message);
	}
	
	public void deleteMessage(Message message) {
		messageDAO.delete(message);
	}
}
