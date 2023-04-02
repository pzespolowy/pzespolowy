package com.musicweb.musicwebserver.repository;


import com.musicweb.musicwebserver.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
