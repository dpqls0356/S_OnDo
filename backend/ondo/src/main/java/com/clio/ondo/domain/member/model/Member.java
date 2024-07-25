package com.clio.ondo.domain.member.model;

import java.util.Date;

import com.clio.ondo.domain.character.model.Character;

import jakarta.persistence.CascadeType;
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
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
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

	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(name = "birth_date")
	private Date birthDate;

	@OneToOne(mappedBy = "member", cascade = CascadeType.REMOVE)
	private Character character;

	public void updateNickName(String newNickname) {
		this.nickname = newNickname;
	}

	public void updateProfileUrl(String newProfileUrl) {
		this.profileUrl = newProfileUrl;
	}

	public void updatePassword(String newPassword) {
		this.password = newPassword;
	}

	public Member(String email, String password, String name, String nickname, Role role) {
		this.email = email;
		this.password = password;
		this.name = name;
		this.nickname = nickname;
		this.joinDate = new Date();
		this.role = role;
	}
}