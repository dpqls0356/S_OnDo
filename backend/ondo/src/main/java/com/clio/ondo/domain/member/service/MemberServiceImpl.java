package com.clio.ondo.domain.member.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;

	@Transactional
	public Member join(Member member) {
		return memberRepository.save(member);
	}

	@Override
	@Transactional
	public void updatePassword(Long memberId, String newPassword) {
		Optional<Member> memberOptional = memberRepository.findById(memberId);
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			member.updatePassword(newPassword);
		} else {
			throw new IllegalStateException("비밀번호 변경이 실패했습니다.");
		}
	}

	@Override
	@Transactional
	public void updateNickname(Long memberId, String newNickname) {
		Optional<Member> memberOptional = memberRepository.findById(memberId);
		if (memberOptional.isPresent()) {
			Member member = memberOptional.get();
			member.updateNickName(newNickname);
		} else {
			throw new IllegalStateException("별명 변경이 실패했습니다.");
		}
	}

}
