package com.clio.ondo.domain.mission.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Getter;

@Document(collection="missionDetail")
@Getter
public class MissionDetail {

	@Id
	private long id; //미션디테일아이디
	private String title; //제목
	private String content; //내용
	private String type; //데일리 or 특별
	private int exp; //경험치
	private int level; //단계
}
