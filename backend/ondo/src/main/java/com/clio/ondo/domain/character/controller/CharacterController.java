package com.clio.ondo.domain.character.controller;

import java.util.Optional;

import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.character.model.Character;
import com.clio.ondo.domain.character.model.dto.ChangeRequestDto;
import com.clio.ondo.domain.character.repository.CharacterRepository;
import com.clio.ondo.domain.character.service.CharacterService;
import com.clio.ondo.global.ResponseVO;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/character")
@Slf4j
public class CharacterController {

	private final JwtTokenProvider jwtTokenProvider;
	private final CharacterService characterService;

	//현재 멤버의 캐릭터 가져오기
	@GetMapping("/getCharacter")
	public ResponseEntity<ResponseVO<Character>> getCharacter(HttpServletRequest request){
		String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
		Long memberId = jwtTokenProvider.getIdFromToken(token);

		Character ch=characterService.getCharacters(memberId);

		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("character", ch));
	}

	//현재 멤버의 캐릭터 이름 바꾸기
	@PostMapping("/changeName")
	public ResponseEntity<ResponseVO<Void>> changeName(HttpServletRequest request,
		@RequestBody ChangeRequestDto changeName){
		String token = jwtTokenProvider.getJwtTokenFromRequestHeader(request);
		Long memberId = jwtTokenProvider.getIdFromToken(token);
		String newName=changeName.getName();
		characterService.changeName(memberId,newName);

		return ResponseEntity.status(HttpStatus.OK).body(ResponseVO.success("이름 업데이트 완료"));
		
	}

}
