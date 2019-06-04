package com.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banking.entity.Payee;

@Repository
public interface PayeeRepository extends JpaRepository<Payee, Long> {

}
