package com.clio.ondo.domain.counselDetail.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.counselDetail.model.CounselDetail;
import com.clio.ondo.domain.counselDetail.model.MemberWithReservationDto;
import com.clio.ondo.domain.counselDetail.service.CounselDetailService;
import com.clio.ondo.global.ResponseVO;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CounselDetailController {
	private final JwtTokenProvider jwtTokenProvider;
	private final CounselDetailService counselDetailService;

	@GetMapping("/api/v1/counselor/member")
	public ResponseEntity<?> getCounselDetail(HttpServletRequest request, @RequestParam Long memberId) {
		try{
			String token = jwtTokenProvider.getJwtTokenFromCookies(request, "accessToken");
			Long id = jwtTokenProvider.getIdFromToken(token);

			MemberWithReservationDto memberWithReservationDto = counselDetailService.getRerservationWithDetail(id);
			Map<String, Object> retMap = new HashMap<String, Object>();
			retMap.put("member", memberWithReservationDto);

			return ResponseEntity.status(HttpStatus.OK)
				.body(new ResponseVO<>(true, "내담자 정보 조회에 성공했습니다.", retMap));
		}
		catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseVO<>(false, "내담자 정보 조회에 실패했습니다.", null));
		}
	}
}
