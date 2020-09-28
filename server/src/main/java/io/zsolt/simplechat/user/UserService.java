package io.zsolt.simplechat.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import io.zsolt.simplechat.message.Message;
import io.zsolt.simplechat.message.MessageService;

public class UserService {
	
	public static UserService instance;
	private static int LIFETIME_START = 3;
	private static int LIFETIME_DEC_RATE = 1;
	private static int LIFETIME_DEC_PERIOD = 5000;
	private UserDAO userDAO;
	private Map<String, Integer> lifeTime;
	private MessageService messageService;
	
	private UserService() {
		userDAO = UserDAO.getInstance();
		lifeTime = new HashMap<String, Integer>();
		messageService = MessageService.getInstance();
		scheduleInactiveUserRemoval();
	}
	
	public static UserService getInstance() {
		if (instance == null) {
			instance = new UserService();
		}
		return instance;
	}
	
	public List<User> getAll() {
		return userDAO.getUserList();
	}
	
	public User get(String id) {
		return userDAO.getUser(id);
	}
	
	public void add(User user) {
		userDAO.addUser(user);
		lifeTime.put(user.getId(), LIFETIME_START);
		//System.out.println("User added: " + user.getName());
	}
	
	public void delete(User user) {
		userDAO.deleteUser(user);
	}
	
	/**
	 * Removes the users whose client is shut down.
	 */
	private void removeInactiveUsers() {
		String userId;
		int currentLifeTime;
		
		for (User user : getAll()) {
			userId = user.getId();
			currentLifeTime = lifeTime.get(userId);
			
			if (currentLifeTime > 0) {
				lifeTime.put(userId, currentLifeTime - LIFETIME_DEC_RATE);
			} else {
				delete(user);
				cleanUpMessages(user);
				//System.out.println("User removed: " + user.getName());
				break;
			}
		}
	}
	
	/**
	 * Sets up a Timer schedule to check for inactive clients.
	 * @return A Timer object.
	 */
	private Timer scheduleInactiveUserRemoval() {
		Timer inactiveUserRemovalTimer = new Timer();
		TimerTask inactiveUserRemovalTask = new TimerTask() {
			@Override
			public void run() {
				removeInactiveUsers();
			}
		};
		
		inactiveUserRemovalTimer.scheduleAtFixedRate(
				inactiveUserRemovalTask, 0, LIFETIME_DEC_PERIOD);
		
		return inactiveUserRemovalTimer;
	}
	
	/**
	 * Deletes all the messages of a removed user.
	 */
	private void cleanUpMessages(User user) {
		List<Message> messages = messageService.getAllMessagesOfUser(user.getId());
		for (Message message : messages) {
			messageService.deleteMessage(message);
		}
	}
}
