package com.project.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.demo.entity.Task;
import com.project.demo.repository.TaskRepository;


@RestController
@RequestMapping("/tasks")
@CrossOrigin("*")
public class TaskController {
	
	@Autowired
	TaskRepository taskRepository;

	@PostMapping
	public Task createTask(@RequestBody Task task)
	{
	   return taskRepository.save(task);	
	}
	
	@GetMapping
	public List<Task> getAllTasks(){
		return taskRepository.findAll();
	}
	
	@DeleteMapping("/{id}")
	public String deleteTask(@PathVariable Long id) {
		taskRepository.deleteById(id);
		return "task deleted";
	}
}
