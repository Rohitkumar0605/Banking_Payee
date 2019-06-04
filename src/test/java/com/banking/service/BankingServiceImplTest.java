package com.banking.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
import junit.framework.Assert;

@RunWith(MockitoJUnitRunner.class)
public class BankingServiceImplTest {

	@InjectMocks
	BankingServiceImpl bankingServiceImpl;

	@Mock
	AccountRepository accountRepository;

	@Mock
	OtpRepository otpRepository;

	@Mock
	LoginRepository loginRepository;

	@Mock
	PayeeRepository payeeRepository;

	static AccountDto accountDto = new AccountDto();
	static Account account = new Account();
	static Login login = new Login();
	static Payee pay = new Payee();
	static List<Payee> lst = new ArrayList<Payee>();
	static PayeeRequest pay1 = new PayeeRequest();
	static Payee pa = new Payee();
	static Otp ot = new Otp();

	ResponseEntity<String> expectedvalue = new ResponseEntity<String>("Invalid otp", HttpStatus.BAD_REQUEST);
	static Optional<Payee> paye1 = Optional.empty();
	ResponseEntity<String> expectedvalue2 = new ResponseEntity<String>("Successfully deleted", HttpStatus.OK);

	@BeforeClass
	public static void setUp() {

		accountDto.setAccountNumber(12345678L);
		accountDto.setFirstName("Rohit");
		accountDto.setLastName("Kumar");
		accountDto.setPancard("cppcis099");
		accountDto.setEmailId("rohit@gmail.com");
		accountDto.setContactNumber(1234L);

		account.setAccountNumber(accountDto.getAccountNumber());
		account.setActionMessage("success");
		account.setContactNumber(accountDto.getContactNumber());
		account.setEmailId(accountDto.getEmailId());
		account.setFirstName(accountDto.getFirstName());
		account.setLastName(accountDto.getLastName());
		account.setPancard(accountDto.getPancard());

		login.setPassword("password");
		login.setUserName(accountDto.getFirstName().substring(0, 3) + accountDto.getLastName().substring(0, 3));
		login.setActionMessage("success");

		pay.setPayeeId(1L);
		pay.setAccountNumber(123L);
		pay.setAccountType("Saving");
		pay.setBranch("BLR");
		pay.setContactNumber(12426L);
		pay.setPayeeName("Rohit");
		paye1 = Optional.of(pay);

		lst.add(pay);

		pay1.setAccountNumberDto(123L);
		pay1.setAccountTypeDto("Saving");
		pay1.setBranchDto("BLR");
		pay1.setContactNumberDto(12426L);
		pay1.setPayeeNameDto("Rohit");

		pa.setAccountNumber(pay1.getAccountNumberDto());
		pa.setAccountType(pay1.getAccountTypeDto());
		pa.setBranch(pay1.getBranchDto());
		pa.setContactNumber(pay1.getContactNumberDto());
		pa.setPayeeName(pay1.getPayeeNameDto());

		ot.setOtpId(1);
		ot.setOtpNumber("123");

	}

	@Test
	public void testCreateAccount() {
		Login log = bankingServiceImpl.createAccount(accountDto);
		Assert.assertEquals("RohKum", log.getUserName());
	}

	@Test
	public void testValidateLogin() {
		Mockito.when(loginRepository.findByUserNameAndPassword("RohKum", "password")).thenReturn(login);
		Login actval3 = bankingServiceImpl.validateLogin("RohKum", "password");
		Assert.assertEquals("RohKum", actval3.getUserName());
	}

	@Test
	public void testGetAllPayee() {
		Mockito.when(payeeRepository.findAll()).thenReturn(lst);
		List<Payee> actval1 = bankingServiceImpl.getAllPayee();
		Assert.assertEquals(1, actval1.size());
	}

	@Test
	public void testAdd() {
		String actval2 = bankingServiceImpl.add(pay1);
		Assert.assertEquals("Successfully added", actval2);

	}

	@Test
	public void testValidate() {
		ResponseEntity<String> rslt = bankingServiceImpl.validate("123");
		Assert.assertEquals(expectedvalue, rslt);

	}

	@Test
	public void testUpdate() {
		Mockito.when(payeeRepository.findById(1L)).thenReturn(paye1);
		Mockito.when(payeeRepository.save(pay)).thenReturn(pay);
		String actval3 = bankingServiceImpl.update(1L, 123L);
		Assert.assertEquals("Successfully updated", actval3);

	}

	@Test
	public void testDeletePayee() throws Exception {
		Mockito.when(payeeRepository.findById(1L)).thenReturn(paye1);
		ResponseEntity<String> rslt2 = bankingServiceImpl.deletePayee(1L);
		Assert.assertEquals(expectedvalue2, rslt2);

	}

}
