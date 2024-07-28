package com.clio.ondo.domain.member.service;

import com.clio.ondo.domain.member.model.LoginRequestDto;
import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.model.JoinRequestDto;
import com.clio.ondo.global.auth.TokenDto;

public interface MemberService {
	Long join(JoinRequestDto joinRequestDto);
	void updatePassword(Long memberId, String newPassword);
	void updateNickname(Long memberId, String newNickname);
	Member findOne(Long memberId);
	TokenDto login(LoginRequestDto loginRequestDto);
	void logout(String accessToken);
	String reissueAccessToken(String refreshToken);
}
