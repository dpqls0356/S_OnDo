package com.clio.ondo.domain.mission.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.model.MissionDetail;
import com.clio.ondo.domain.mission.model.MissionDto;
import com.clio.ondo.domain.mission.service.MissionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mission")
public class MissionController {

	@Autowired
	private MissionService missionService;

	@PostMapping("/random")
	public ResponseEntity<Void> getRandomMission(){
		missionService.createRandomMission();
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@PostMapping("/typicalMission")
	public List<Mission>  getTypicalMission(){
		List<Mission> typicalMission=missionService.getTypicalMission();

		return typicalMission;
	}

	@PostMapping("/dailyMission")
	public List<MissionDetail> getDailyMission(){
		List<MissionDetail> dailyMission=missionService.getDailyMission();
		return dailyMission;
	}

}
