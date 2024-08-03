package com.clio.ondo.domain.counselor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.domain.member.model.Gender;

@Service
public interface CounselorService {
	 List<CounselorResponseDto> getCounselorList();
	 CounselorResponseDto getCounselor(Long counselorId);
	 List<CounselorResponseDto> filteredList(String name, Gender gender,String field);
}
