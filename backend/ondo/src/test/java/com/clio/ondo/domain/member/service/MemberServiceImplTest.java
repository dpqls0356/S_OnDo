package com.clio.ondo.domain.member.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.member.model.Member;
import com.clio.ondo.domain.member.model.Role;
import com.clio.ondo.domain.member.repository.MemberRepository;

@SpringBootTest
@Transactional
class MemberServiceImplTest {

	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private MemberService memberService;

	@Test
	public void 회원가입() throws Exception{
	    //given
		Member member = new Member("m1@gmail.com", "qwerasdf","memberA", "회원A", Role.USER);
	    //when
		Long memberId = memberService.join(member);
	    //then
		Assertions.assertThat(member).isEqualTo(memberService.findOne(memberId));
	}

	@Test
	public void 중복_회원_예외발생() throws Exception{
	    //given
		Member member1 = new Member("m1@gmail.com", "qwerasdf","memberA", "회원A", Role.USER);
	    Member member2 = new Member("m1@gmail.com", "qwerasdf","memberB", "회원B", Role.USER);
		//when
		memberService.join(member1);
	    //then
		org.junit.jupiter.api.Assertions.assertThrows(IllegalStateException.class, () -> {
			memberService.join(member2);
		});
	}

	@Test
	public void 회원_비밀번호_변경() throws Exception{
	    //given
		String firstPassword = "first";
		Member member = new Member("m1@gmail.com", firstPassword,"memberA", "회원A", Role.USER);
	    Long memberId = memberService.join(member);
		//when
		String changedPassword = "changed";
	    memberService.updatePassword(memberId, changedPassword);
	    //then
		Assertions.assertThat(memberService.findOne(memberId).getPassword()).isEqualTo(changedPassword);
	}

	@Test
	public void 회원_별명_변경() throws Exception{
	    //given
		Member member = new Member("m1@gmail.com", "asdfzxcv","memberA", "회원A", Role.USER);
	    Long memberId = memberService.join(member);
		//when
		String changedNickname = "처음별명과다른별명이여야한다.";
		memberService.updateNickname(memberId, changedNickname);
	    //then
		Assertions.assertThat(memberService.findOne(memberId).getNickname()).isEqualTo(changedNickname);
	}
}