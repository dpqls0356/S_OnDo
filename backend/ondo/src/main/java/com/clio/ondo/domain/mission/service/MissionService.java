package com.clio.ondo.domain.mission.service;

import static java.time.LocalDateTime.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.mission.model.Mission;
import com.clio.ondo.domain.mission.model.MissionDetail;
import com.clio.ondo.domain.mission.repository.MissionDetailRepository;
import com.clio.ondo.domain.mission.repository.MissionRepository;

@Service
public class MissionService {

	@Autowired
	private MissionDetailRepository missionDetailRepository;

	@Autowired
	private MissionRepository missionRepository;

	private Random random = new Random();

	public void createRandomMission(){

		List<MissionDetail> allMissionDetails=missionDetailRepository.findByType("typical"); //특별미션만 추출
		List<MissionDetail> selectedMissionDetails=allMissionDetails.stream()
			.sorted((a,b)->random.nextInt(3)-1)
			.limit(3)
			.toList();

		List<Mission> newMissions=selectedMissionDetails.stream()
			.map(detail->new Mission(
				null,
				false,
				now(),
				22,
				detail.getTitle(),
				detail.getContent(),
				detail.getType(),
				detail.getExp(),
				detail.getLevel()
			))
			.toList();

		missionRepository.saveAll(newMissions);
	}

	public List<Mission> getTypicalMission(){
		List<Mission> typicalMission=missionRepository.findByCompleteFlag(false);
		return typicalMission;
	}

	public List<MissionDetail> getDailyMission(){
		List<MissionDetail> dailyMission=missionDetailRepository.findByType("daily"); //데일리 미션 가져오기
		return dailyMission;
	}


}
