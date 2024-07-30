package com.clio.ondo.domain.mission.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.repository.TodayMissionRepository;
import com.clio.ondo.domain.mission.service.MissionService;

@RestController
@RequestMapping("/api/v1/mission")
public class MissionController {

	@Autowired
	private MissionService missionService;

	//3개의 랜덤 특별 미션 + 데일리 미션 todayMission에 저장
	@GetMapping("/update/{memberId}")
	public ResponseEntity<Void> updateTodayMission(@PathVariable Long memberId){
		missionService.TodayMission(memberId);
		return ResponseEntity.status(HttpStatus.OK).build();
	}


	//오늘의 특별미션 가져오기
	@GetMapping("/todayTypical/{memberId}")
	public List<Mission> getTodayTypical(@PathVariable Long memberId){
		List<Mission> todayMission= missionService.todayMission(memberId);
		List<Mission> typicalMissions = todayMission.stream()
			.filter(mission -> "typical".equals(mission.getType()))
			.toList();

		return typicalMissions;
	}

	//오늘의 데일리미션 가져오기
	@GetMapping("/todayDaily/{memberId}")
	public List<Mission> getTodayDaily(@PathVariable Long memberId){
		List<Mission> todayMission= missionService.todayMission(memberId);
		List<Mission> dailyMissions = todayMission.stream()
			.filter(mission -> "daily".equals(mission.getType()))
			.toList();

		return dailyMissions;
	}

	//완료한 미션 완료처리
	@GetMapping("/completeMission")
	public ResponseEntity<Void> completeMission(@RequestParam Long memberId,
		@RequestParam String title){
		missionService.updateCompleteMission(memberId, title);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	//완료한 특별 미션 completeMission에 넣기 + 나머지 삭제
	@GetMapping("/clearMission/{memberId}")
	public ResponseEntity<Void> clearMission(@PathVariable Long memberId) {
		missionService.putCompleteMission(memberId);
		return ResponseEntity.status(HttpStatus.OK).build();
	}




}
