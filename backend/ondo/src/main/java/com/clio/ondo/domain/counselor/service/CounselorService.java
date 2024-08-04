package com.clio.ondo.domain.counselor.service;

import java.util.List;

import com.clio.ondo.domain.counselor.model.Counselor;
import org.springframework.security.core.AuthenticationException;

import com.clio.ondo.domain.counselor.model.dto.CounselorLoginRequestDto;
import com.clio.ondo.domain.counselor.model.dto.CounselorResponseDto;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;

public interface CounselorService {
    TokenDto login(CounselorLoginRequestDto loginRequestDto) throws AuthenticationException;
    void join(Counselor counselor);
    List<CounselorResponseDto> getCounselorList();
}
