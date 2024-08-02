package com.clio.ondo.domain.counselor.model.dto;

import com.clio.ondo.domain.member.model.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CounselorResponseDto {

	private Long id;

	private String name;
	private Gender gender;
	private String field;
	private String selfIntroduction;
	private String profileUrl;

}
