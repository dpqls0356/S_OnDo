package com.clio.ondo.domain.mission.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataMongoTest
class MissionDetailTest {
	@Autowired
	private MongoTemplate mongoTemplate;

	private MissionDetail missionDetail;

	@BeforeEach
	public void setup(){
		missionDetail=MissionDetail.builder()
			.id(null)
			.title("Test Mission Detail")
			.content("This is a test missionDetail")
			.type("typical")
			.exp(100)
			.level(1)
			.build();
	}

	@Test
	public void testMissionDetailSaveAndRetrieve(){
		mongoTemplate.save(missionDetail);
	}

}