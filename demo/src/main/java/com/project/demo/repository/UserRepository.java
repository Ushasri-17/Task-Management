package com.project.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);
}
