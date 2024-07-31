package com.clio.ondo.domain.member.service;

import org.springframework.security.core.AuthenticationException;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.model.dto.DeleteRequestDto;
import com.clio.ondo.domain.member.model.dto.JoinRequestDto;
import com.clio.ondo.domain.member.model.dto.LoginRequestDto;
import com.clio.ondo.domain.member.model.dto.UpdateRequestDto;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;

public interface MemberService {
	void join(JoinRequestDto joinRequestDto);

	Member findOne(Long memberId);

	TokenDto login(LoginRequestDto loginRequestDto) throws AuthenticationException;

	void logout(String accessToken) throws AuthenticationException;

	void deleteMember(DeleteRequestDto deleteRequestDto, String token);

	void updateMember(UpdateRequestDto updateRequestDto, String token);

	String reissueAccessToken(String refreshToken) throws AuthenticationException;
}
