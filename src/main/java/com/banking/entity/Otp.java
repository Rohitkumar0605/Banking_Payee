package com.banking.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Otp implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int otpId;
	private String otpNumber;

	public int getOtpId() {
		return otpId;
	}

	public void setOtpId(int otpId) {
		this.otpId = otpId;
	}

	public String getOtpNumber() {
		return otpNumber;
	}

	public void setOtpNumber(String otpNumber) {
		this.otpNumber = otpNumber;
	}

	@Override
	public String toString() {
		return "Otp [otpId=" + otpId + ", otpNumber=" + otpNumber + "]";
	}

}
