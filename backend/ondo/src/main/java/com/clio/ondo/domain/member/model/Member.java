package com.clio.ondo.domain.member.model;

import java.util.Date;

import com.clio.ondo.domain.character.model.Character;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;

@Entity
@Getter
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id", nullable = false)
	private Long id;

	@Column(name = "member_pw", nullable = false)
	private String password;

	@Column(nullable = false)
	private String email;

	@Column(name = "member_name", nullable = false)
	private String name;

	@Column(name = "nick_name", nullable = false)
	private String nickname;

	@Temporal(TemporalType.DATE)
	@Column(name = "join_date", nullable = false)
	private Date joinDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false)
	private Role role;

	@Column(name = "profile_url")
	private String profileUrl;

	@OneToOne(mappedBy = "character")
	private Character character;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(name = "birth_date")
	private Date birthDate;

	public static void updateNickName(Member member, String newNickname) {
		member.nickname = newNickname;
	}

	public static void updateProfileUrl(Member member, String newProfileUrl) {
		member.profileUrl = newProfileUrl;
	}

}