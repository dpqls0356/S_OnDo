package com.clio.ondo.domain.schedule.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public interface ScheduleService {
	String getDaySchedule(String day, Long counselorId);

	@Transactional
	String updateDaySchedule(String day, Long counselorId, String time);
}
