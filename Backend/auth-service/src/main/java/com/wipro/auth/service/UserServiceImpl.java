package com.wipro.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.auth.entity.User;
import com.wipro.auth.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public List<User> getAllUsers(){
		return userRepository.findByRole("USER");
	}
	
	@Override
	public List<User> getUserById(Integer id){
		return userRepository.findByUserId(id);
	}

	@Override
	public void deleteUser(Integer userId) {
		userRepository.deleteById(userId);;
	}

	@Override
	public Integer updateUser(User user) {
		return userRepository.save(user).getUserId();
	}

}
