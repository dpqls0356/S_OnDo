package com.clio.ondo.domain.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.repository.MemberRepository;
import com.clio.ondo.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

	private final MemberRepository memberRepository;
	private final MemberService memberService;:sq

	@PostMapping("/join")
	public Long createMember(@RequestBody Member member) {
		return memberService.saveMember(member);
	}

}
