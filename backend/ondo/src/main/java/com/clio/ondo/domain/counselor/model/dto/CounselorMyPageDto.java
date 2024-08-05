package com.clio.ondo.domain.counselor.model.dto;

import java.util.List;

import com.clio.ondo.domain.career.model.Career;
import com.clio.ondo.domain.member.model.Gender;

public class CounselorMyPageDto {

	private Long id;

	private String counselorId;
	private String password;

	private String name;
	private Gender gender;
	private String field;

	private List<Career> career;
	private String selfIntroduction;
	private String profileUrl;

}
