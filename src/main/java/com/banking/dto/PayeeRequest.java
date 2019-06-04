package com.banking.dto;

import java.io.Serializable;

public class PayeeRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String payeeNameDto;
	private String branchDto;
	private Long accountNumberDto;
	private String accountTypeDto;
	private Long contactNumberDto;

	public PayeeRequest() {
		super();

	}

	public String getPayeeNameDto() {
		return payeeNameDto;
	}

	public void setPayeeNameDto(String payeeNameDto) {
		this.payeeNameDto = payeeNameDto;
	}

	public String getBranchDto() {
		return branchDto;
	}

	public void setBranchDto(String branchDto) {
		this.branchDto = branchDto;
	}

	public Long getAccountNumberDto() {
		return accountNumberDto;
	}

	public void setAccountNumberDto(Long accountNumberDto) {
		this.accountNumberDto = accountNumberDto;
	}

	public String getAccountTypeDto() {
		return accountTypeDto;
	}

	public void setAccountTypeDto(String accountTypeDto) {
		this.accountTypeDto = accountTypeDto;
	}

	public Long getContactNumberDto() {
		return contactNumberDto;
	}

	public void setContactNumberDto(Long contactNumberDto) {
		this.contactNumberDto = contactNumberDto;
	}

	@Override
	public String toString() {
		return "PayeeRequest [payeeNameDto=" + payeeNameDto + ", branchDto=" + branchDto + ", accountNumberDto="
				+ accountNumberDto + ", accountTypeDto=" + accountTypeDto + ", contactNumberDto=" + contactNumberDto
				+ "]";
	}

}
