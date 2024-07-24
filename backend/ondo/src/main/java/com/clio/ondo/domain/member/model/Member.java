package com.clio.ondo.domain.member.model;

import java.util.Date;

import com.clio.ondo.domain.character.model.Character;

import jakarta.persistence.*;
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

	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(name = "birth_date")
	private Date birthDate;

	// 부모 객체인 Member에서 Character의 생명주기를 관리한다.
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "charcter_id")
	private Character character;

	public void updateNickName(Member member, String newNickname) {
		member.nickname = newNickname;
	}

	public void updateProfileUrl(Member member, String newProfileUrl) {
		member.profileUrl = newProfileUrl;
	}

	public void increaseCharacterExp(int additionalExp) {
		if (character != null) {
			character.increaseExp(additionalExp);
		}
	}

	public void changeCharacterName(String name) {
		if (character != null) {
			character.updateName(name);
		}
	}

}