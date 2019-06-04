package com.banking.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.dto.AccountDto;
import com.banking.entity.Account;
import com.banking.entity.Login;
import com.banking.entity.Payee;
import com.banking.repository.AccountRepository;
import com.banking.repository.LoginRepository;
import com.banking.repository.PayeeRepository;

@Service
public class BankingServiceImpl implements BankingService {
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private LoginRepository loginRepository;

	@Autowired
	private PayeeRepository payeeRepository;

	@Override
	@Transactional
	public Login createAccount(AccountDto accountDto) {
		Account account = new Account();
		account.setAccountNumber(accountDto.getAccountNumber());
		account.setActionMessage("success");
		account.setContactNumber(accountDto.getContactNumber());
		account.setEmailId(accountDto.getEmailId());
		account.setFirstName(accountDto.getFirstName());
		account.setLastName(accountDto.getLastName());
		account.setPancard(accountDto.getPancard());

		Login login = new Login();
		login.setPassword("password");
		login.setUserName(accountDto.getFirstName().substring(0, 3) + accountDto.getLastName().substring(0, 3));
		login.setActionMessage("success");

		login.setAccount(account);

		accountRepository.save(account);
		loginRepository.save(login);

		return login;
	}

	@Override
	public Login validateLogin(String userName, String password) {

		Login login = new Login();

		login = loginRepository.findByUserNameAndPassword(userName, password);
		if (login != null) {
			login.setActionMessage("success");
			return login;
		} else {
			login.setActionMessage("Login failed");
			return login;
		}
	}

	@Override
	public List<Payee> getAllPayee() {
		return payeeRepository.findAll();
	}

}
