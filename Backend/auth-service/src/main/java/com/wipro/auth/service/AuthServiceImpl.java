package com.wipro.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.auth.beans.Role;
import com.wipro.auth.entity.User;
import com.wipro.auth.exceptions.EmptyPasswordException;
import com.wipro.auth.exceptions.EmptyUsernameException;
import com.wipro.auth.exceptions.ExistingUserException;
import com.wipro.auth.repository.AuthRepository;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	AuthRepository authRepository;

	@Override
	public Role authenticateUser(User user) {
		User userEntity = authRepository.findByUsername(user.getUsername());
		if(userEntity.getPassword().equals(user.getPassword()))
			return new Role(userEntity.getRole());
		return null;
	}
	
	@Override
	public Integer authenticateForUserId(User user) {
		User userEntity = authRepository.findByUsername(user.getUsername());
		if(userEntity.getPassword().equals(user.getPassword()))
			return userEntity.getUserId();
		return 0;
	}
	
	@Override
	public Integer registerUser(User user) {
		if(authRepository.findByUsername(user.getUsername()) != null)
			throw new ExistingUserException();
		if(user.getUsername().isEmpty())
			throw new EmptyUsernameException();
		if(user.getPassword().isEmpty())
			throw new EmptyPasswordException();
		if(user.getRole() == null)
			user.setRole("USER");
		return authRepository.save(user).getUserId();
	}

	@Override
	public User getUser(String username) {
		return authRepository.findByUsername(username);
	}

}
