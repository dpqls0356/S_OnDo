package com.clio.ondo.domain.counselor.service;

import java.util.List;

import com.clio.ondo.domain.counselor.model.Counselor;
import org.springframework.security.core.AuthenticationException;

import com.clio.ondo.domain.counselor.model.dto.CounselorLoginRequestDto;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.domain.member.model.Gender;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;


import org.springframework.stereotype.Service;

import com.clio.ondo.domain.counselor.model.Counselor;

@Service
public interface CounselorService {
    TokenDto login(CounselorLoginRequestDto loginRequestDto) throws AuthenticationException;
    void join(Counselor counselor);
    List<CounselorResponseDto> getCounselorList();
    CounselorResponseDto getCounselor(Long counselorId);
    List<CounselorResponseDto> filteredList(String name, Gender gender,String field);
	Counselor getCounselorEntity(Long id);
}
