package com.cpl.jobs.repositories;

import com.cpl.jobs.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email=?1 ")
    User findUserByMail1(String email);

    @Query("SELECT u FROM User u WHERE u.email=?1 and u.password=?2")
    User findUserByMailAAndPassword(String email, String password);

    @Query("SELECT u FROM User u WHERE u.role.id = ?1")
    List<User> findUserByRole(Long role);


    @Query("SELECT u FROM User u WHERE u.email=?1 ")
    User findUserByMail(String email);



}
