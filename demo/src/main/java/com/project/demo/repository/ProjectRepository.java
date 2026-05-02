package com.project.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.demo.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>{

}
