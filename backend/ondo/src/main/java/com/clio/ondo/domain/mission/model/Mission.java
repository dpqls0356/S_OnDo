package com.clio.ondo.domain.mission.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection="mission")
@Getter
@Setter
@Builder
public class Mission {

	@Id
	private long id; //미션아이디
	private boolean completeFlag; //완료여부
	private LocalDateTime completeTime; //완료시간
	private long memberId; //멤버 아이디

	private String title; //제목
	private String content; //내용
	private String type; //데일리 or 특별
	private int exp; //경험치
	private int level; //단계

}
