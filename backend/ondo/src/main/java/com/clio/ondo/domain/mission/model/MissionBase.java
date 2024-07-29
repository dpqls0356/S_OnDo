package com.clio.ondo.domain.mission.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public abstract class MissionBase {
	@Id
	private ObjectId id;
	private Long memberId;
	private List<Mission> missions;

	protected MissionBase() {}

	protected MissionBase(ObjectId id, Long memberId, List<Mission> missions) {
		this.id = id;
		this.memberId = memberId;
		this.missions = missions;
	}
}
