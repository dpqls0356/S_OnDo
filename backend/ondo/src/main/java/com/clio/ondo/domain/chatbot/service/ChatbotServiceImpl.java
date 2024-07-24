package com.clio.ondo.domain.chatbot.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.clio.ondo.domain.chatbot.model.openaiDto.ChatCompletion;
import com.clio.ondo.domain.chatbot.model.openaiDto.OpenAiRequestDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.RoleContentMessage;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.repository.ChatbotRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:openaiapi.properties")
public class ChatbotServiceImpl implements ChatbotService{
	@Value("${api.key}")
	String api;

	private final ChatbotRepository chatbotRepository;

	@Transactional
	public ChatbotChatting createChatting(ChatbotChatting chatbotChatting) {
		return chatbotRepository.save(chatbotChatting);
	}

	@Transactional
	public String getResponseFromOpenAIChatCompletion(Long memberId, String text) {
		ChatbotChatting requestChatting = new ChatbotChatting(null, "user", text, LocalDateTime.now(), memberId);
		createChatting(requestChatting);

		WebClient webClient = WebClient.builder().build();
		String url = "https://api.openai.com/v1/chat/completions";
		String command = "\"You are a friendly and empathetic companion who speaks casually and informally,like a close friend." +
				"Your job is to provide a listening ear, offer comforting conversation, and help users feel less alone.\"";

		List<RoleContentMessage> roleContentMessages = new ArrayList<>();
		roleContentMessages.add(new RoleContentMessage("system", command));
		roleContentMessages.add(new RoleContentMessage("user", text));
		OpenAiRequestDto dto = new OpenAiRequestDto("gpt-3.5-turbo", roleContentMessages);

		ResponseEntity<ChatCompletion> responseBody = webClient.post()
				.uri(url)	// url 정의
				.header("Content-Type", "application/json")
				.header("Authorization", "Bearer " + api)
				.bodyValue(dto)	// requestBody 정의
				.retrieve()	// 응답 정의 시작
				.toEntity(ChatCompletion.class)	// 응답 데이터 정의
				.block();	// 동기식 처리

		ChatCompletion responseChatCompletion = responseBody.getBody();
		String responseString = responseChatCompletion.getChoices().get(0).getMessage().getContent();
		ChatbotChatting responseChatting = new ChatbotChatting(null, "bot", responseString, LocalDateTime.now(), memberId);
		chatbotRepository.save(responseChatting);

		return responseString;
	}
}

