package com.clio.ondo.domain.counselor.model;

import java.util.List;

import com.clio.ondo.domain.member.model.Gender;
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
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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
	private List<Reservation> reservations;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "schedule_id")
	private Schedule schedule;

}
