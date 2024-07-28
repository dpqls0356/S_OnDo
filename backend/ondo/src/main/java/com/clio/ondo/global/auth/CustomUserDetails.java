package com.clio.ondo.global.auth;

import java.util.Collection;
import java.util.List;

import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.clio.ondo.domain.member.model.Member;

import lombok.Getter;

@Getter
public class CustomUserDetails implements UserDetails {

	private Long id;
	private String name;
	private String nickname;
	private String password;
	private final String role;
	private final String email;

	public CustomUserDetails(String email, String role) {
		this.email = email;
		this.role = role;
	}
	public CustomUserDetails(Member member) {
		this.name = member.getName();
		this.nickname = member.getNickname();
		this.password = member.getPassword();
		this.role = member.getRole().toString();
		this.email = member.getEmail();
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
