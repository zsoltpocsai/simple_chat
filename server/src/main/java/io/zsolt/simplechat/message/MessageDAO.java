package io.zsolt.simplechat.message;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class MessageDAO {
	public static MessageDAO instance;
	private List<Message> messageList;
	
	private MessageDAO() {
		messageList = new ArrayList<Message>();
	}
	
	public static MessageDAO getInstance() {
		if (instance == null) {
			instance = new MessageDAO();
		}
		return instance;
	}
	
	public List<Message> getAll() {
		return Collections.unmodifiableList(messageList);
	}
	
	public List<Message> getAllOfUser(String userId) {
		return messageList.stream()
				.filter(message -> message.getSender().getId().equals(userId) || 
						message.getRecipient().getId().equals(userId))
				.collect(Collectors.toList());
	}
	
	public void add(Message message) {
		messageList.add(message);
	}
	
	public void update(Message message) {
		// for now it only updates the `unread` field
		for (Message storedMessage : messageList) {
			if (storedMessage.getId().equals(message.getId())) {
				storedMessage.setUnread(message.isUnread());
				break;
			}
		}
	}
	
	public void delete(Message message) {
		messageList.remove(message);
	}
}
