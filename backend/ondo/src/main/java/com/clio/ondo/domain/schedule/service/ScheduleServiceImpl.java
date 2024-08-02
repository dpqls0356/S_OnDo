package com.clio.ondo.domain.schedule.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.counselor.model.Counselor;
import com.clio.ondo.domain.counselor.repository.CounselorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
	private final CounselorRepository counselorRepository;

	@Override
	public String getDaySchedule(String day, Long counselorId){
		Counselor counselor = counselorRepository.findById(counselorId).get();
		return switch (day) {
			case "monday" -> counselor.getSchedule().getMonday();
			case "tuesday" -> counselor.getSchedule().getTuesday();
			case "wednesday" -> counselor.getSchedule().getWednesday();
			case "thursday" -> counselor.getSchedule().getThursday();
			case "friday" -> counselor.getSchedule().getFriday();
			default -> "";
		};
	}

	@Override
	@Transactional
	public String updateDaySchedule(String day, Long counselorId, String time){
		Counselor counselor = counselorRepository.findById(counselorId).get();
		switch(day){
			case "monday":
				counselor.getSchedule().setMonday(time);
				break;
			case "tuesday":
				counselor.getSchedule().setTuesday(time);
				break;
			case "wednesday":
				counselor.getSchedule().setWednesday(time);
				break;
			case "thursday":
				counselor.getSchedule().setThursday(time);
				break;
			case "friday":
				counselor.getSchedule().setFriday(time);
				break;
			default:
				break;
		}

		return getDaySchedule(day, counselorId);
	}
}
