package com.clio.ondo.domain.chatbot.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import com.clio.ondo.domain.chatbot.model.ChattingDocument;
import com.clio.ondo.domain.chatbot.model.ChattingReadDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.ChatCompletion;
import com.clio.ondo.domain.chatbot.model.openaiDto.OpenAiRequestDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.RoleContentMessage;
import com.clio.ondo.domain.mission.model.Mission;
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

	String conversationCommand = "\"You are a friendly and empathetic companion who speaks casually and informally,like a close friend." +
			"Your job is to provide a listening ear, offer comforting conversation, and help users feel less alone.\"";

	
	// 미션 디테일 가져오는게 만들어지면 그걸 더하는 식으로 가야됨 일단은 하드코딩
	String recommendCommand = "\"You need to recommend 3 missions from the mission list." +
			"The user will provide you numbers of recently completed missions, and you need to consider this to ensure the number of completions per mission is balanced." +
			"Respond with the numbers of the missions you recommend only." +
			"The mission list is as follows:" +
			"[1. 환기, 2. 좋아하는 음악 듣기, 3. 시 한 편 읽기, 4. 집에서 영화보기, 5. 집에서 좋아하는 영화보기, 6. 좋아하는 문장 탐색해보기, 7. 퍼즐 맞추기, 8. 간단한 스트레칭하기," +
			"9. 집에서 한 챕터 이상 책 읽기, 10. 감사일기 쓰기, 11. 명상하기, 12. 계단 오르기, 13. 홈트하기, 14. 커뮤니티 글 쓰기, 15. 청소하기, 16. 관심있는 주제 온라인 강의 수강하기," +
			"17. 산책, 18. 가족이나 친구에게 안부묻기, 19. 마트 구경가기, 20. 카페가기, 21. 좋아하는 음식 만들어 먹기, 22. 도서관에 방문해 책 대여하기, 23. 도서관 방문해 독서하기," +
			"24. 자기소개서 작성하기, 25. 입사 지원하기, 26. 상담신청하기, 27. 영화관 방문해 영화보기, 28. 취업 지원 센터 방문하기, 29. 봉사활동 하기, 30. 자격증 취득하기]\"";

	String missionAlarmCommand = "\"You need to generate a conversation where you suggest an action to the user based on the content they provide about the mission.\"";

	private final ChatbotDocumentRepository chatbotRepository;
	private final StringParsingServiceImpl stringParsingService;

	// 사용자가 대화를 입력했을 경우 동작하는 함수
	@Transactional
	public List<String> getResponseFromOpenAIChatCompletion(Long memberId, String text) {
		ChatbotChatting requestChatting = new ChatbotChatting(null, "user", text, LocalDateTime.now(), memberId);
		chatbotRepository.upsertByMemberId(memberId, requestChatting);

		WebClient webClient = WebClient.builder().build();
		String url = "https://api.openai.com/v1/chat/completions";

		// 여기도 최근 미션 리스트를 받아오는 부분이 들어간다. 일단은 하드코딩
		List<Integer> recentMissions = new ArrayList<>(Arrays.asList(1, 3, 2, 19, 7));

		List<RoleContentMessage> roleContentMessages = new ArrayList<>();
		roleContentMessages.add(new RoleContentMessage("system", conversationCommand));
		roleContentMessages.add(new RoleContentMessage("user", recentMissions.toString()));
		OpenAiRequestDto dto = new OpenAiRequestDto("gpt-4o-mini", roleContentMessages);

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

	// 이전 채팅 내역을 page 단위로 가져오는 함수
	public List<ChattingReadDto> getChatbotChattings(Long memberId, int page, int size) {
		List<ChatbotChatting> chatbotChattings = chatbotRepository.getChattingsByPage(memberId, page, size);
		return chatbotChattings.stream()
			.map(a -> new ChattingReadDto(a.getContent(), a.getSender(), a.getCreatedAt()))
			.collect(Collectors.toList());
	}

	// 미션을 추천 받는 함수
	@Transactional
	public List<Mission> getRecommendFromChatbot(Long memberId, List<Mission> missions) {
		WebClient webClient = WebClient.builder().build();
		String url = "https://api.openai.com/v1/chat/completions";

		List<RoleContentMessage> roleContentMessages = new ArrayList<>();
		roleContentMessages.add(new RoleContentMessage("system", recommendCommand));
		roleContentMessages.add(new RoleContentMessage("user", recommendCommand));
		OpenAiRequestDto dto = new OpenAiRequestDto("gpt-4o-mini", roleContentMessages);

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

		// 문자열을 리스트로 파싱하기
		String[] parts = responseString.split(", ");
		List<Integer> numbers = new ArrayList<>();
		for (String part : parts) {
			numbers.add(Integer.parseInt(part));
		}

		// 여기도 Mission을 숫자에 따라서 Mission을 가져오는 부분이 되겠는데? 일단 하드코딩
		List<Mission> recommendedMissions = new ArrayList<>();
		recommendedMissions.addAll(missions);

		return recommendedMissions;
	}

	// 추천 받은 미션을 저장하고 챗봇 메시지 생성하는 부분
	@Transactional
	public List<String> createRecommendMessage(Long memberId, List<Mission> recommendedMissions) {
		WebClient webClient = WebClient.builder().build();
		String url = "https://api.openai.com/v1/chat/completions";

		// 여기도 최근 미션 리스트를 받아오는 부분이 들어간다. 일단은 하드코딩
		String firstMissionContent = "";
		if(!recommendedMissions.isEmpty()){
			firstMissionContent = recommendedMissions.get(0).getContent();
		}
		else return null;

		List<RoleContentMessage> roleContentMessages = new ArrayList<>();
		roleContentMessages.add(new RoleContentMessage("system", missionAlarmCommand));
		roleContentMessages.add(new RoleContentMessage("user", firstMissionContent));
		OpenAiRequestDto dto = new OpenAiRequestDto("gpt-4o-mini", roleContentMessages);

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
}

