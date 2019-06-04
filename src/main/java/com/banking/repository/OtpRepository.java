package com.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banking.entity.Otp;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Integer> {

	Otp findByOtpNumber(String otp);

}
