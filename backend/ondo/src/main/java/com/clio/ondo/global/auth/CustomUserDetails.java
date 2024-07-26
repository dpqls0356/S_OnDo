package com.clio.ondo.global.auth;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.clio.ondo.domain.member.model.Member;

import lombok.Getter;

@Getter
public class CustomUserDetails implements UserDetails {

	private Long id;
	private final String name;
	private final String nickname;
	private final String password;
	private final String role;
	private final String email;
	private final Long characterId;

	public CustomUserDetails(Member member) {
		this.name = member.getName();
		this.nickname = member.getNickname();
		this.password = member.getPassword();
		this.role = member.getRole().toString();
		this.email = member.getEmail();
		this.characterId = member.getCharacter().getId();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.name;
	}

	@Override
	public boolean isAccountNonExpired() {
		return UserDetails.super.isAccountNonExpired();
	}

	@Override
	public boolean isAccountNonLocked() {
		return UserDetails.super.isAccountNonLocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return UserDetails.super.isCredentialsNonExpired();
	}

	@Override
	public boolean isEnabled() {
		return UserDetails.super.isEnabled();
	}
}
