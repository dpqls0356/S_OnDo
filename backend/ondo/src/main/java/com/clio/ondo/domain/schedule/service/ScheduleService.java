package com.clio.ondo.domain.schedule.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clio.ondo.domain.schedule.model.Schedule;
import com.clio.ondo.domain.schedule.model.ScheduleDto;

@Service
public interface ScheduleService {

	ScheduleDto getSchedule(Long counselorId);

	@Transactional
	ScheduleDto updateSchedule(Long counselorId, ScheduleDto newSchedule);
}
