package com.wipro.auth.service;

import com.wipro.auth.beans.Role;
import com.wipro.auth.entity.User;

public interface AuthService {

	Role authenticateUser(User user);

	Integer registerUser(User user);

	User getUser(String username);

	Integer authenticateForUserId(User user);

	Role newPwd(String email, String opwd, String pwd);

}
