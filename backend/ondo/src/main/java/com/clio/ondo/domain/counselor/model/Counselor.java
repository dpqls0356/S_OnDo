package com.clio.ondo.domain.counselor.model;

import java.util.ArrayList;
import java.util.List;

import com.clio.ondo.domain.member.model.Gender;
import com.clio.ondo.domain.member.model.Role;
import com.clio.ondo.domain.reservation.model.Reservation;
import com.clio.ondo.domain.schedule.model.Schedule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Counselor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "counselor_id", nullable = false)
	private String counselorId;

	@Column(name = "counselor_pw", nullable = false)
	private String password;

	@Column(name = "counselor_name", nullable = false)
	private String name;

	@Enumerated
	private Gender gender;

	@Column(nullable = false)
	private String field;

	@Column(name = "self_introduction")
	private String selfIntroduction;

	@Column(name = "profile_url")
	private String profileUrl;

	@OneToMany(mappedBy = "counselor")
	private List<Reservation> reservations = new ArrayList<>();

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "schedule_id")
	private Schedule schedule;

	@Enumerated
	private Role role;

	@Builder
	public Counselor(String counselorId, String password, String name, String field, String selfIntroduction, String profileUrl) {
		this.counselorId = counselorId;
		this.password = password;
		this.name = name;
		this.field = field;
		this.selfIntroduction = selfIntroduction;
		this.profileUrl = profileUrl;
		this.schedule = new Schedule();
		this.role = Role.COUNSELOR;
	}
}
