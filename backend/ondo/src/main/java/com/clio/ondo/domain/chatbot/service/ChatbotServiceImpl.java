package com.clio.ondo.domain.chatbot.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.clio.ondo.domain.chatbot.model.ChattingDocument;
import com.clio.ondo.domain.chatbot.model.ChattingReadDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.ChatCompletion;
import com.clio.ondo.domain.chatbot.model.openaiDto.OpenAiRequestDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.RoleContentMessage;
import lombok.RequiredArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.repository.ChatbotDocumentRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:openaiapi.properties")
public class ChatbotServiceImpl implements ChatbotService{
	@Value("${api.key}")
	String api;

	private final ChatbotDocumentRepository chatbotRepository;
	private final StringParsingServiceImpl stringParsingService;

	// 사용자가 대화를 입력했을 경우 동작하는 함수
	@Transactional
	public List<String> getResponseFromOpenAIChatCompletion(Long memberId, String text) {
		ChatbotChatting requestChatting = new ChatbotChatting(null, "user", text, LocalDateTime.now(), memberId);
		chatbotRepository.upsertByMemberId(memberId, requestChatting);

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

		List<String> parsedStrings = stringParsingService.parseLine(responseString);
		for(String parsedString : parsedStrings){
			ChatbotChatting responseChatting = new ChatbotChatting(null, "bot", parsedString, LocalDateTime.now(), memberId);
			chatbotRepository.upsertByMemberId(memberId, responseChatting);
		}

		return parsedStrings;
	}

	public List<ChattingReadDto> getChatbotChattings(Long memberId, int page, int size) {
		List<ChatbotChatting> chatbotChattings = chatbotRepository.getChattingsByPage(memberId, page, size);
		return chatbotChattings.stream()
			.map(a -> new ChattingReadDto(a.getContent(), a.getSender(), a.getCreatedAt()))
			.collect(Collectors.toList());
	}
}

