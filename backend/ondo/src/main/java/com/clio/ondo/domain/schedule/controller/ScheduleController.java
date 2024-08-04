package com.clio.ondo.domain.schedule.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.schedule.model.Schedule;
import com.clio.ondo.domain.schedule.model.ScheduleDto;
import com.clio.ondo.domain.schedule.service.ScheduleService;
import com.clio.ondo.global.ResponseVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ScheduleController {
	private final ScheduleService scheduleService;

	@GetMapping("/api/v1/counselor/schedule/{counselorId}")
	public ResponseEntity<?> getDaySchedule(@PathVariable Long counselorId) {
		try{
			ScheduleDto schedule = scheduleService.getSchedule(counselorId);
			Map<String, Object> retMap = new HashMap<>();
			retMap.put("schedule", schedule);

			return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseVO<>(true, "일정 조회 성공", retMap));
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseVO<>(false, "일정을 가져올 수 없습니다.", null));
		}
	}

	@PutMapping("/api/v1/counselor/schedule/{counselorId}")
	public ResponseEntity<?> updateDaySchedule(@PathVariable Long counselorId, @RequestBody ScheduleDto schedule) {
		try{
			System.out.println(schedule);
			ScheduleDto resultSchedule = scheduleService.updateSchedule(counselorId, schedule);
			Map<String, Object> retMap = new HashMap<>();
			retMap.put("schedule", resultSchedule);

			return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseVO<>(true, "성공적으로 변경 되었습니다. ", retMap));
		}
		catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseVO<>(false, "일정 변경에 실패했습니다.", null));
		}
	}
}
