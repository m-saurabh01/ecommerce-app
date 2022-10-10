package com.wipro.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.auth.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	List<User> findByRole(String role);
	List<User> findByUserId(Integer userId);
	List<User> findByUsername(String username);
	
}
