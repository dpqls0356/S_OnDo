package com.clio.ondo.domain.chatbot.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.service.ChatbotServiceImpl;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatbotController {
	private final ChatbotServiceImpl chatbotService;

	@PostMapping("/api/v1/chatbot/insert/{memberId}")
	public ResponseEntity<?> insert(@PathVariable("memberId") Long memberId) {
		try{
			ChatbotChatting chatting = new ChatbotChatting("testid", "testContent", "bot", LocalDateTime.now(), memberId);

			ChatbotChatting result = chatbotService.createChatting(chatting);
			return ResponseEntity.status(HttpStatus.OK)
				.body(new Result<>(true,HttpStatus.OK.value(), result));
		}catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new Result<>(true, HttpStatus.BAD_REQUEST.value(), "저장 실패"));
		}
	}

	@Data
	@Builder
	static class Result<T> {
		boolean success;
		int status;
		T data;
	}
}
