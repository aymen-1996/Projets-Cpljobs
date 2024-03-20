package com.bna.ebanking.repositories;

import com.bna.ebanking.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
}
