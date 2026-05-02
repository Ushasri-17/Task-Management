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

import com.project.demo.entity.Project;
import com.project.demo.repository.ProjectRepository;

@RestController
@RequestMapping("/projects")
@CrossOrigin("*")

public class ProjectController {
	
	@Autowired
	ProjectRepository projectRepository;

	@PostMapping
	public Project createProject(@RequestBody Project project) {
		
		return projectRepository.save(project);
		
	}
	
	@GetMapping
	public List<Project> getAllProjects() {
		return projectRepository.findAll();
	}
	
	@DeleteMapping("/{id}")
	public String deleteProject(@PathVariable Long id) {
		projectRepository.deleteById(id);
		return "Project Deleted";
	}
	
}
