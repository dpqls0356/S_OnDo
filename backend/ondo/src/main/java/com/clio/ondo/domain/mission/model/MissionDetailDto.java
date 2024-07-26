package com.clio.ondo.domain.mission.model;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MissionDetailDto {

	private ObjectId _id; //미션디테일아이디
	private String title; //제목
	private String content; //내용
	private String type; //데일리 or 특별
	private int exp; //경험치
	private int level; //단계
}
