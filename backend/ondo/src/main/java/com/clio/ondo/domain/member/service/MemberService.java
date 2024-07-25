package com.clio.ondo.domain.member.service;

import com.clio.ondo.domain.member.model.Member;

public interface MemberService {
	Member join(Member member);
	void updatePassword(Long memberId, String newPassword);
	void updateNickname(Long memberId, String newNickname);
}
