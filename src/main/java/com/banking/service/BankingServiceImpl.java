package com.banking.service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.banking.dto.AccountDto;
import com.banking.dto.PayeeRequest;
import com.banking.entity.Account;
import com.banking.entity.Login;
import com.banking.entity.Otp;
import com.banking.entity.Payee;
import com.banking.repository.AccountRepository;
import com.banking.repository.LoginRepository;
import com.banking.repository.OtpRepository;
import com.banking.repository.PayeeRepository;

@Service
public class BankingServiceImpl implements BankingService {
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private OtpRepository otpRepository;

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

	public Login validateLogin(String userName, String password) {

		Login login = new Login();

		login = loginRepository.findByUserNameAndPassword(userName, password);
		if (login != null) {
			login.setActionMessage("success");
			return login;
		} else {
			Login login1 = new Login();
			login1.setUserName(userName);
			login1.setActionMessage(userName + "is not a valid user");
			return login1;
		}
	}

	@Override
	public List<Payee> getAllPayee() {
		return payeeRepository.findAll();
	}

	@Override
	public String add(PayeeRequest payeeRequest) {
		Payee pay = new Payee();
		pay.setAccountNumber(payeeRequest.getAccountNumberDto());
		pay.setAccountType(payeeRequest.getAccountTypeDto());
		pay.setBranch(payeeRequest.getBranchDto());
		pay.setContactNumber(payeeRequest.getContactNumberDto());
		pay.setPayeeName(payeeRequest.getPayeeNameDto());
		pay.setActionMessage("");

		payeeRepository.save(pay);

		return "Successfully added";
	}

	@Override
	public String generateOtp() {
		System.out.println("inside sendEmail1");

		final String username = "rohit060593@gmail.com";
		final String password = "Qwedsa@123";

		Properties props = new Properties();
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("rohit060593@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("rohitkumar999rns@gmail.com"));
			message.setSubject("One Time Password(OTP) for Your transaction ");
			message.setText("Your One-Time Password request :- " + random(6));

			Transport.send(message);

			System.out.println("Done");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
		return "Successfully generated";

	}

	public String random(int size) {
		try {

			List<Otp> lOtp = otpRepository.findAll();
			for (Otp lp : lOtp) {
				otpRepository.delete(lp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		StringBuilder generatedToken = new StringBuilder();
		try {
			SecureRandom number = SecureRandom.getInstance("SHA1PRNG");
			// Generate 20 integers 0..20
			for (int i = 0; i < size; i++) {
				generatedToken.append(number.nextInt(9));
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		String otp = generatedToken.toString();
		Otp ot = new Otp();
		ot.setOtpNumber(otp);
		otpRepository.save(ot);

		return otp;

	}

	@Override
	public ResponseEntity<String> validate(String otp) {
		Otp otpRepo = otpRepository.findByOtpNumber(otp);
		if (otpRepo != null) {
			if (otp.equals(otpRepo.getOtpNumber())) {
				return new ResponseEntity<String>("Successfully validated", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Invalid otp", HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity<String>("Invalid otp", HttpStatus.BAD_REQUEST);
	}

	@Override
	public String update(Long payeeId, Long accountNumber) {
		Payee pa = payeeRepository.findById(payeeId).get();
		pa.setAccountNumber(accountNumber);
		payeeRepository.save(pa);
		return "Successfully updated";
	}
	
	@Override
    public ResponseEntity<String> deletePayee(Long payeeId) throws Exception {
        Payee payee = payeeRepository.findById(payeeId).get();
        if (payee != null) {
            payeeRepository.delete(payee);
            return new ResponseEntity<String>("Successfully deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Invalid data...", HttpStatus.BAD_REQUEST);
        }
    }
}
