package com.clio.ondo.domain.character.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.character.repository.CharacterRepository;
import com.clio.ondo.global.auth.jwtUtil.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/character")
@Slf4j
public class CharacterController {

	private final JwtTokenProvider jwtTokenProvider;
	private final CharacterRepository characterRepository;


}
