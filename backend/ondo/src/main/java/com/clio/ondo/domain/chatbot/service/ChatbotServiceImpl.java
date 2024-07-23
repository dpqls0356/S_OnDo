package com.clio.ondo.domain.chatbot.service;

import com.clio.ondo.domain.chatbot.model.openaiDto.ChatCompletion;
import com.clio.ondo.domain.chatbot.model.openaiDto.OpenAiRequestDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.RoleContentMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.repository.ChatbotRepository;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:openaiapi.properties")
public class ChatbotServiceImpl implements ChatbotService{
	@Value("${api.key}")
	String api;
	@Autowired
	private ChatbotRepository chatbotRepository;

	public ChatbotChatting createChatting(ChatbotChatting chatbotChatting) {
		return chatbotRepository.save(chatbotChatting);
	}

	public ChatCompletion getResponseFromOpenAIChatCompletion(String text) {
		WebClient webClient = WebClient.builder().build();
		String url = "https://api.openai.com/v1/chat/completions";
		String command = "\"You are a friendly and empathetic companion who speaks casually and informally,like a close friend." +
				"Your job is to provide a listening ear, offer comforting conversation, and help users feel less alone.\"";

		RoleContentMessage[] roleContentMessages = new RoleContentMessage[2];
		roleContentMessages[0] = new RoleContentMessage("system", command);
		roleContentMessages[1] = new RoleContentMessage("user", text);
		OpenAiRequestDto dto = new OpenAiRequestDto("gpt-3.5-turbo", roleContentMessages);
		// POST 요청
		ResponseEntity<ChatCompletion> responseBody = webClient.post()
				.uri(url)	// url 정의
				.header("Content-type", "application/json")
				.header("Authorization", "Bearer " + api)
				.bodyValue(dto)	// requestBody 정의
				.retrieve()	// 응답 정의 시작
				.toEntity(ChatCompletion.class)	// 응답 데이터 정의
				.block();	// 동기식 처리

		return responseBody.getBody();
	}
}
