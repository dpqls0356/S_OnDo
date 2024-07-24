package com.clio.ondo.domain.mission.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.service.MissionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mission")
public class MissionController {

	@Autowired
	private MissionService missionService;

	@PostMapping("/random")
	public String getRandomMission(){
		missionService.createRandomMission();
		return "정상적으로 생성";
	}

	@PostMapping("/typicalMission")
	public String getTypicalMission(){
		List<Mission> typicalMission=missionService.getTypicalMission();
		for(Mission m:typicalMission){
			System.out.println(m);
		}
		return "특별미션 가져오기";
	}

}
