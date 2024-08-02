package com.clio.ondo.domain.schedule.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.chatbot.controller.ChatbotController;
import com.clio.ondo.domain.schedule.model.ScheduleUpdateDto;
import com.clio.ondo.domain.schedule.service.ScheduleService;
import com.clio.ondo.global.ResponseVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ScheduleController {
	private final ScheduleService scheduleService;

	@GetMapping("/api/v1/counselor/schedule/{counselorId}/{day}")
	public ResponseEntity<?> getDaySchedule(@PathVariable Long counselorId, @PathVariable String day) {
		try{
			String time = scheduleService.getDaySchedule(day, counselorId);
			Map<String, Object> retMap = new HashMap<>();
			retMap.put("day", day);
			retMap.put("time", time);

			return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseVO<>(true, "일정 조회 성공", retMap));
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseVO<>(false, "일정을 가져올 수 없습니다.", null));
		}
	}

	@PutMapping("/api/v1/counselor/schedule/{counselorId}/{day}")
	public ResponseEntity<?> updateDaySchedule(@PathVariable Long counselorId, @PathVariable String day, @RequestBody ScheduleUpdateDto time) {
		try{
			String updatedTime = scheduleService.updateDaySchedule(day, counselorId, time.getTime());
			Map<String, Object> retMap = new HashMap<>();
			retMap.put("day", day);
			retMap.put("time", updatedTime);

			return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseVO<>(true, "성공적으로 변경 되었습니다. ", retMap));
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseVO<>(false, "일정 변경에 실패했습니다.", null));
		}
	}
}
