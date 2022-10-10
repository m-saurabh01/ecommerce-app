package com.wipro.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.auth.entity.User;
import com.wipro.auth.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("users")
	public List<User> getAllUsers(){
		log.info("Getting all users");
		return userService.getAllUsers();
	}
	
	@GetMapping("user")
	public List<User> getUserById(@RequestParam Integer userId){
		log.info("Getting user by id");
		return userService.getUserById(userId);
	}
	
	@DeleteMapping("delete/user")
	public void deleteUser(@RequestParam Integer userId) {
		log.info("deleting user");
		userService.deleteUser(userId);
	}
	
	@PutMapping("update/user")
	public Integer updateUser(@RequestBody User user) {
		log.info("Updating user");
		return userService.updateUser(user);
	}

}
