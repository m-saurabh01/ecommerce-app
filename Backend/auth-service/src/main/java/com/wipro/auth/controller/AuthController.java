package com.wipro.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.auth.beans.Role;
import com.wipro.auth.entity.User;
import com.wipro.auth.service.AuthService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
	
	@Autowired
	AuthService authService;
	
	@PostMapping("login")
	public Role authenticateUser(@RequestBody User user) {
		log.info("Authenticating user");
		return authService.authenticateUser(user);
	}
	
	@RequestMapping(value="{email}/{opwd}/{npwd}",method=RequestMethod.POST)
	public Role newPwds(@PathVariable("email")String email,@PathVariable("opwd")String opwd,@PathVariable("npwd")String npwd) {
		log.info("Authenticating user");
		return authService.newPwd(email, opwd, npwd);
	}
	
	@PostMapping("register")
	public Integer registerUser(@RequestBody User user) {
		log.info("Registering user");
		return authService.registerUser(user);
	}
	
	@PostMapping("userId")
	public Integer authenticateForId(@RequestBody User user) {
		return authService.authenticateForUserId(user);
	}

}
