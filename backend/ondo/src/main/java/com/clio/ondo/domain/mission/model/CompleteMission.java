package com.clio.ondo.domain.mission.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Getter;

@Document(collection="CompleteMission")
@Getter
@Builder
public class CompleteMission extends MissionBase{

	public CompleteMission(ObjectId id, Long memberId, List<Mission> missions) {
		super(id, memberId, missions);
	}
}
