package com.clio.ondo.domain.character.model;

import com.clio.ondo.domain.member.model.Member;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "characters")
public class Character {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "character_id")
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private int level;

	@Column(nullable = false)
	private int exp;

	public void updateName(String name) {
		this.name = name;
	}

	public void increaseExp(int additionalExp) {
		this.exp += additionalExp;
	}

}
