package com.clio.ondo.domain.member.service;

import org.springframework.stereotype.Service;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;

	@Override
	public Long saveMember(Member member) {
		return memberRepository.save(member);
	}
}
