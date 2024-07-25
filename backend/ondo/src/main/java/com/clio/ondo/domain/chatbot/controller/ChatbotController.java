package com.clio.ondo.domain.chatbot.controller;

import java.time.LocalDateTime;
import java.util.List;

import com.clio.ondo.domain.chatbot.model.ChatInput;
import com.clio.ondo.domain.chatbot.model.ChattingReadDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.ChatCompletion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
	public ResponseEntity<?> insert(@PathVariable("memberId") Long memberId, @RequestBody ChatInput chatInput) {
		try{
			String responseChatting = chatbotService.getResponseFromOpenAIChatCompletion(memberId, chatInput.getMessage());

			return ResponseEntity.status(HttpStatus.OK)
				.body(new Result<>(true,HttpStatus.OK.value(), responseChatting));
		}catch(Exception e){
			//e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new Result<>(false, HttpStatus.BAD_REQUEST.value(), "메세지 입력 실패"));
		}
	}

	@GetMapping("/api/v1/chatbot/list/{memberId}")
	public ResponseEntity<?> read(@PathVariable("memberId") Long memberId, @RequestParam int page, @RequestParam int size) {
		try{
			List<ChattingReadDto> chattingList = chatbotService.getChatbotChattings(memberId, page, size);

			return ResponseEntity.status(HttpStatus.OK)
				.body(new Result<>(true,HttpStatus.OK.value(), chattingList));
		}catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new Result<>(false, HttpStatus.BAD_REQUEST.value(), "채팅 목록을 가져올 수 없습니다."));
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
