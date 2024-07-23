package com.clio.ondo.domain.character.model;

import com.clio.ondo.domain.member.model.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Entity
@Getter
public class Character {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "character_id")
	private Long id;

	@OneToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@JoinColumn(nullable = false)
	private String name;

	@JoinColumn(nullable = false)
	private int level;
}
