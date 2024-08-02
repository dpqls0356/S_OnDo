package com.clio.ondo.domain.reservation.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.reservation.model.CounselorReservationAddDto;
import com.clio.ondo.domain.reservation.model.CounselorReservationDto;
import com.clio.ondo.domain.reservation.model.DeleteReservationDto;
import com.clio.ondo.domain.reservation.service.CounselorReservationService;
import com.clio.ondo.global.ResponseVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CounselorReservationController {

	private final CounselorReservationService counselorReservationService;

	@GetMapping("/api/v1/counselor/reservation/{counselorId}/{date}")
	public ResponseEntity<?> getReservation(@PathVariable Long counselorId, @PathVariable String date) {
		try{
			CounselorReservationAddDto crDto = new CounselorReservationAddDto();
			crDto.setCounselorId(counselorId);
			crDto.setReservationDate(LocalDateTime.of(2024, 8, 15, 0, 0, 0));
			counselorReservationService.addReservation(crDto);

			List<CounselorReservationDto> list = counselorReservationService.getReservationByDate(counselorId, date);
			Map<String, Object> retMap = new HashMap<>();
			retMap.put("reservations", list);

			return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseVO<>(true, "조회에 성공했습니다.", retMap));
		}
		catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseVO<>(false, "조회에 실패했습니다.", null));
		}
	}

	@DeleteMapping("/api/v1/counselor/reservation")
	public ResponseEntity<?> deleteReservation(@RequestBody DeleteReservationDto deleteReservationDto) {
		try{
			counselorReservationService.deleteReservation(deleteReservationDto.getReservationId());

			return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseVO<>(true, "삭제에 성공했습니다.", null));
		}
		catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseVO<>(false, "삭제에 실패했습니다.", null));
		}
	}
}
