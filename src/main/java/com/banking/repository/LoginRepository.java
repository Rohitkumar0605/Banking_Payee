package com.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banking.entity.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
	Login findByUserNameAndPassword(String userName, String password);
}
