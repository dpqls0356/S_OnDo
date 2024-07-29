package com.clio.ondo.domain.mission.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.service.MissionService;

@RestController
@RequestMapping("/mission")
public class MissionController {

	@Autowired
	private MissionService missionService;

	//MissionDetail에서 랜덤으로 특별미션 추출 후 Mission에 저장
	@GetMapping("/random")
	public ResponseEntity<Void> getRandomMission(){
		missionService.createRandomMission();
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	//Mission에서 완료하지 않은 특별 미션 가져오기
	@GetMapping("/typicalMission")
	public List<Mission>  getTypicalMission(){
		List<Mission> typicalMission=missionService.getTypicalMission();
		return typicalMission;
	}

	//Mission에서 완료하지 않은 데일리 미션 가져오기
	@GetMapping("/dailyMission")
	public List<Mission> getDailyMission(){
		missionService.saveDailyMission(); //MissionDetail에서 daily 미션 추출 후 Mission에 저장
		List<Mission> dailyMission=missionService.getDailyMission();
		return dailyMission;
	}

}
