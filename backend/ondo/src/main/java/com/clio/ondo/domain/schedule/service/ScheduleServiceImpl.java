package com.clio.ondo.domain.schedule.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.schedule.model.Schedule;
import com.clio.ondo.domain.schedule.model.ScheduleDto;
import com.clio.ondo.domain.schedule.repository.ScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
	private final ScheduleRepository scheduleRepository;

	@Override
	public ScheduleDto getSchedule(Long counselorId){
		Schedule schedule = scheduleRepository.findByCounselorId(counselorId);
		return new ScheduleDto(schedule);
	}

	@Override
	@Transactional
	public ScheduleDto updateSchedule(Long counselorId, ScheduleDto newSchedule){
		Schedule schedule = scheduleRepository.findByCounselorId(counselorId);
		schedule.update(newSchedule);

		return getSchedule(counselorId);
	}
}
