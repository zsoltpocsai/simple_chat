package io.zsolt.simplechat.user;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UserDAO {
	private static UserDAO instance = null;
	private List<User> userList;
	
	private UserDAO() {
		userList = new ArrayList<User>();
	}
	
	public static UserDAO getInstance() {
		if (instance == null) {
			instance = new UserDAO();
		}
		return instance;
	}
	
	public List<User> getUserList() {
		return Collections.unmodifiableList(userList);
	}
	
	public User getUser(String id) {
		for (User user : userList) {
			if (user.getId().equals(id)) return user;
		}
		return null;
	}
	
	public void addUser(User user) {
		if (getUser(user.getId()) == null) {
			userList.add(user);
		}
	}
	
	public void deleteUser(User user) {
		userList.remove(user);
	}
}
