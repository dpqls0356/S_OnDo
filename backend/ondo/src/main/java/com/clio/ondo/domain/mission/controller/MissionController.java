package com.clio.ondo.domain.mission.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
