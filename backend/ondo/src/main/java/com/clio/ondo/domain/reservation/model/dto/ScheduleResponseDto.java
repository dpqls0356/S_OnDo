package com.clio.ondo.domain.reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class ScheduleResponseDto {

	private long counselorId; 
	private int year;
	private int month;  // 월은 1부터 12까지의 값을 반환
	private int day ;
	private int hour ;
	private int minute;

}
