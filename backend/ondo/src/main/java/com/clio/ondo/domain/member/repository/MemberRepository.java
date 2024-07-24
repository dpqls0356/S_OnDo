package com.clio.ondo.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clio.ondo.domain.member.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

	Long save(Member member);

	List<Member> findAll();

	Optional<Member> findById(Long id);

	Optional<Member> findByEmail(String email);

	boolean existsById(Long id);

	void deleteById(Long id);

	long count();

}
