package com.project.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.demo.entity.User;
import com.project.demo.repository.UserRepository;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/register")
	public String registerUser(@RequestBody User user) 
	{
	    userRepository.save(user);
	    return "User registered successfully.";
	}
	
	@PostMapping("/login")
	public String loginUser(@RequestBody User user) 
	{
		User existingUser = userRepository.findByEmail(user.getEmail());
		
		if(existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
			return "Login successful";
		}
		else {
			return "Invalid credentials";
		}
		
	}

}
