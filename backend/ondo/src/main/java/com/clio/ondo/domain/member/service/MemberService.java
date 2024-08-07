package com.clio.ondo.domain.member.service;

import java.io.IOException;
import java.util.List;

import org.springframework.security.core.AuthenticationException;
import org.springframework.web.multipart.MultipartFile;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.model.dto.DeleteRequestDto;
import com.clio.ondo.domain.member.model.dto.JoinRequestDto;
import com.clio.ondo.domain.member.model.dto.LoginRequestDto;
import com.clio.ondo.domain.member.model.dto.UpdateRequestDto;
import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.global.auth.jwtUtil.TokenDto;

public interface MemberService {
	//void join(JoinRequestDto joinRequestDto) throws IOException;
	void join(JoinRequestDto joinRequestDto, MultipartFile profileImage) throws IOException;
	Member findOne(Long memberId);

	TokenDto login(LoginRequestDto loginRequestDto) throws AuthenticationException;

	void logout(String accessToken) throws AuthenticationException;

	void deleteMember(DeleteRequestDto deleteRequestDto, String token);

	void updateMember(UpdateRequestDto updateRequestDto, String accessToken, MultipartFile profileImage) throws IOException;

	String reissueAccessToken(String refreshToken) throws AuthenticationException;

	List<Reservation> getReservationsForMember(Long memberId);
}
