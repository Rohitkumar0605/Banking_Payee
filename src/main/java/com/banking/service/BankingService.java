package com.banking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.banking.dto.AccountDto;
import com.banking.entity.Login;
import com.banking.entity.Payee;

@Service
public interface BankingService {


	Login createAccount(AccountDto accountDto);

	Login validateLogin(String userName, String password);

	List<Payee> getAllPayee();

}
