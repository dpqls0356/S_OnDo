package com.clio.ondo.domain.mission.model;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Document(collection="TodayMission")
@Getter
@Builder
public class TodayMission extends MissionBase{

	public TodayMission(ObjectId id, Long memberId, List<Mission> missions) {
		super(id, memberId, missions);
	}
}
