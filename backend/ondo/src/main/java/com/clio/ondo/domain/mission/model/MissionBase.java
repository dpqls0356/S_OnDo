package com.clio.ondo.domain.mission.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public abstract class MissionBase {

	@Id
	private ObjectId id;
	private Long memberId;
	private List<Mission> missions;

}
