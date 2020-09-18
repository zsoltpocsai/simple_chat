package io.zsolt.simplechat.message;

import java.util.Date;

import io.zsolt.simplechat.user.User;

public class Message {
	private String id;
	private User sender;
	private User recipient;
	private Date date;
	private String content;
	private Boolean unread;
	
	public Message() {}
	
	public Message(String id, User sender, User recipient, 
			Date date, String content, Boolean unread) {
		this.id = id;
		this.sender = sender;
		this.recipient = recipient;
		this.date = date;
		this.content = content;
		this.unread = unread;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getRecipient() {
		return recipient;
	}

	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

	public Long getDate() {
		return date.getTime();
	}

	public void setDate(Long date) {
		this.date = new Date(date);
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public Boolean isUnread() {
		return unread;
	}
	
	public void setUnread(Boolean value) {
		unread = value;
	}
	
}
