package com.clio.ondo.domain.mission.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.time.LocalDateTime;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class MissionTest {

	@Autowired
	private MongoTemplate mongoTemplate;

	private Mission mission;

	@BeforeEach
	public void setup() {
		mission = Mission.builder()
			.id(1L)
			.completeFlag(false)
			.completeTime(LocalDateTime.now())
			.memberId(123L)
			.title("Test Mission")
			.content("This is a test mission")
			.type("daily")
			.exp(100)
			.level(1)
			.build();
	}

	@Test
	public void testMissionSaveAndRetrieve() {
		// 미션 객체를 MongoDB에 저장
		mongoTemplate.save(mission);

		// // 저장된 미션 객체를 조회
		Mission retrievedMission = mongoTemplate.findById(mission.getId(), Mission.class);
		// //
		// // 조회된 미션 객체가 null이 아닌지 확인
		// assertNotNull(retrievedMission);
		//
		// // 각 필드가 예상한 값과 일치하는지 확인
		// assertEquals(mission.getId(), retrievedMission.getId());
		// assertEquals(mission.isCompleteFlag(), retrievedMission.isCompleteFlag());
		// assertEquals(mission.getMemberId(), retrievedMission.getMemberId());
		// assertEquals(mission.getTitle(), retrievedMission.getTitle());
		// assertEquals(mission.getContent(), retrievedMission.getContent());
		// assertEquals(mission.getType(), retrievedMission.getType());
		// assertEquals(mission.getExp(), retrievedMission.getExp());
		// assertEquals(mission.getLevel(), retrievedMission.getLevel());
	}
}
