package com.banking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.banking.dto.AccountDto;
import com.banking.dto.PayeeRequest;
import com.banking.entity.Login;
import com.banking.entity.Payee;
import com.banking.service.BankingService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BankingController {

	@Autowired
	private BankingService bankingService;

	@PostMapping("/createAccount")
	public ResponseEntity<Login> createAccount(@RequestBody AccountDto accountDto) {
		Login login = bankingService.createAccount(accountDto);

		return new ResponseEntity<Login>(login, HttpStatus.OK);
	}

	@GetMapping("/loginUser/{userName}/{password}")
	public ResponseEntity<Login> validateLogin(@PathVariable String userName, @PathVariable String password) {
		Login login = bankingService.validateLogin(userName, password);
		return new ResponseEntity<Login>(login, HttpStatus.OK);
	}

	@GetMapping("/getAllPayee")
	public List<Payee> getAllPayee() {
		return bankingService.getAllPayee();
	}

	@PostMapping("/addPayee")
	public String addPayee(@RequestBody PayeeRequest payeeRequest) {
		return bankingService.add(payeeRequest);

	}

	@PostMapping("/generateOtp")
	public String generateOtpSendToEmail() {
		return bankingService.generateOtp();

	}

	@GetMapping("/validateOtp/{otp}")
	public ResponseEntity<String> validateOtp(@PathVariable String otp) {

		return bankingService.validate(otp);
	}

	@PutMapping("/updatePayee/{payeeId}/{accountNumber}")
	public String updatePayee(@PathVariable Long payeeId, @PathVariable Long accountNumber) {
		return bankingService.update(payeeId, accountNumber);

	}

	@DeleteMapping("/deletePayee/{payeeId}")
	public ResponseEntity<String> deletePayee(@PathVariable Long payeeId) throws Exception {
		return bankingService.deletePayee(payeeId);
	}

}
