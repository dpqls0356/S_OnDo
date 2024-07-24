package com.clio.ondo.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clio.ondo.domain.member.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Member findByEmail(String email);
	Member findByNickname(String nickname);

}
