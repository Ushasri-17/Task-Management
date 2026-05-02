package com.project.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.demo.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
