package com.clio.ondo.domain.schedule.model;

import com.clio.ondo.domain.counselor.model.Counselor;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Schedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private int monday;

	@Column(nullable = false)
	private int tuesday;

	@Column(nullable = false)
	private int wednesday;

	@Column(nullable = false)
	private int thursday;

	@Column(nullable = false)
	private int friday;

	@OneToOne(mappedBy = "schedule", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
	private Counselor counselor;
}
