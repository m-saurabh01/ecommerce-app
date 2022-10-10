package com.wipro.auth.service;

import java.util.List;

import com.wipro.auth.entity.User;

public interface UserService {

	List<User> getAllUsers();

	List<User> getUserById(Integer id);

	void deleteUser(Integer userId);

	Integer updateUser(User user);

}
