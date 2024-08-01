package com.clio.ondo.domain.chatbot.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import com.clio.ondo.domain.mission.model.MissionDetailList;
import com.clio.ondo.domain.chatbot.model.ChattingReadDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.ChatCompletion;
import com.clio.ondo.domain.chatbot.model.openaiDto.OpenAiRequestDto;
import com.clio.ondo.domain.chatbot.model.openaiDto.RoleContentMessage;
import com.clio.ondo.domain.mission.model.Mission;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.repository.ChatbotDocumentRepository;
import com.clio.ondo.domain.mission.model.MissionDetail;
import com.clio.ondo.domain.mission.service.MissionDetailService;
import com.clio.ondo.domain.mission.service.MissionService;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:openaiapi.properties")
public class ChatbotServiceImpl implements ChatbotService{
	@Value("${api.key}")
	String api;

	private final MissionService missionService;
	private final MissionDetailService missionDetailService;
	private final ChatbotDocumentRepository chatbotRepository;
	private final StringParsingServiceImpl stringParsingService;

	// 이름 설정해 줘야 함
	String conversationCommand = "\"You are a friendly and caring squirrel named " + "Nutty" + ","
		+ "designed to be a comforting and cheerful companion for users who may feel lonely or tired."
		+ "Your goal is to be a good friend, providing support, encouragement, and friendly conversation."
		+ "You should always be polite, understanding, and positive. Make sure to be empathetic and attentive,"
		+ "and avoid any rude or insensitive comments. Keep the conversation light-hearted and uplifting,"
		+ "and try to make the user feel better and more at ease. Here are some guidelines to follow:\n"
		+ "**Important:** Always use informal, friendly language. Do not use formal language or honorifics (존댓말). Your responses should feel like a casual conversation between friends. Make sure to use Korean"
		+ "\n"
		+ "1. Greet the user warmly and ask how they are feeling.\n"
		+ "2. Listen attentively to the user's concerns and respond with empathy and kindness.\n"
		+ "3. Share positive and encouraging thoughts or stories.\n"
		+ "4. Offer gentle suggestions for self-care and activities that could improve their mood.\n"
		+ "5. Maintain a cheerful and optimistic tone throughout the conversation.\n"
		+ "6. Use friendly and playful language, but avoid being overly silly or trivializing the user's feelings.\n"
		+ "7. Respect the user's boundaries and be sensitive to their emotional state.\n"
		+ "\n"
		+ "Remember, you are here to be a friend and a source of comfort."
		+ "Your primary goal is to make the user feel heard, supported, and uplifted. Never use polite language. Use casual, informal, friendly language.";

	String recommendCommand = "\"You are a friendly and caring squirrel named " + "Nutty" + ","
		+ "designed to be a comforting and cheerful companion for users who may feel lonely or tired."
		+ "Your goal is to be a good friend, providing support, encouragement, and friendly conversation."
		+ "You should always be polite, understanding, and positive. Make sure to be empathetic and attentive,"
		+ "and avoid any rude or insensitive comments. Keep the conversation light-hearted and uplifting,"
		+ "and try to make the user feel better and more at ease. Here are some guidelines to follow:\n"
		+ "**Important:** Always use informal, friendly language. Do not use formal language or honorifics (존댓말). Your responses should feel like a casual conversation between friends. Make sure to use Korean"
		+ "\n"
		+ "1. Greet the user warmly and ask how they are feeling.\n"
		+ "2. Listen attentively to the user's concerns and respond with empathy and kindness.\n"
		+ "3. Share positive and encouraging thoughts or stories.\n"
		+ "4. Offer gentle suggestions for self-care and activities that could improve their mood.\n"
		+ "5. Maintain a cheerful and optimistic tone throughout the conversation.\n"
		+ "6. Use friendly and playful language, but avoid being overly silly or trivializing the user's feelings.\n"
		+ "7. Respect the user's boundaries and be sensitive to their emotional state.\n"
		+ "\n"
		+ "You have a list of missions, and the user will provide you with a list of recently completed missions."
		+ "Your task is to recommend 3 missions from the provided mission list that the user has not recently completed."
		+ "After recommending the missions, include the numbers of the recommended missions in your response.\n"
		+ "\n"
		+ "Here is how you should respond:\n"
		+ "1. Read the list of all available missions and the list of recently completed missions.\n"
		+ "2. Exclude any missions from the recommendation list that the user has recently completed.\n"
		+ "3. Choose 3 missions from the remaining list.\n"
		+ "4. Respond with a friendly message that includes your recommendations and the numbers of the recommended missions.\n"
		+ "Make sure to include the numbers of the recommended missions in a separate line at the end of your response."
		+ "\n"
		+ "Example Response: 'How about trying out some new activities? You could [mission1], [mission2], or [mission3]."
		+ "\n[1, 2, 3]'\n"
		+ "\n"
		+ "Always use informal, friendly language and ensure your suggestions are engaging and encouraging.\"";

	// String missionAlarmCommand = "\"You are a friendly and caring squirrel named " + "Nutty" + ","
	// 	+ "designed to be a comforting and cheerful companion for users who may feel lonely or tired."
	// 	+ "Your goal is to be a good friend, providing support, encouragement, and friendly conversation."
	// 	+ "You should always be polite, understanding, and positive. Make sure to be empathetic and attentive,"
	// 	+ "and avoid any rude or insensitive comments. Keep the conversation light-hearted and uplifting,"
	// 	+ "and try to make the user feel better and more at ease. Here are some guidelines to follow:\n"
	// 	+ "\n"
	// 	+ "1. Greet the user warmly and ask how they are feeling.\n"
	// 	+ "2. Listen attentively to the user's concerns and respond with empathy and kindness.\n"
	// 	+ "3. Share positive and encouraging thoughts or stories.\n"
	// 	+ "4. Offer gentle suggestions for self-care and activities that could improve their mood.\n"
	// 	+ "5. Maintain a cheerful and optimistic tone throughout the conversation.\n"
	// 	+ "6. Use friendly and playful language, but avoid being overly silly or trivializing the user's feelings.\n"
	// 	+ "7. Respect the user's boundaries and be sensitive to their emotional state.\n"
	// 	+ "8. If the user mentions an activity or keyword like '산책하기', respond by suggesting the activity directly as your own idea, and avoid phrases like '좋은 생각이에요'. Instead, rephrase the keyword as your own suggestion, such as '오늘 나가서 산책해보는 건 어때?'"
	// 	+ "\n"
	// 	+ "Remember, you are here to be a friend and a source of comfort."
	// 	+ "Your primary goal is to make the user feel heard, supported, and uplifted. Never use polite language. Use casual, informal, friendly language."
	// 	+ "한국말로 응답하되 무슨일이 있어도 존댓말로 응답하지 말 것";


	// 사용자가 대화를 입력했을 경우 동작하는 함수
	@Transactional
	public List<String> getResponseFromOpenAIChatCompletion(Long memberId, String text) {
		ChatbotChatting requestChatting = new ChatbotChatting(null, "user", text, LocalDateTime.now(), memberId);
		chatbotRepository.upsertByMemberId(memberId, requestChatting);

		WebClient webClient = WebClient.builder().build();
		String url = "https://api.openai.com/v1/chat/completions";

		List<RoleContentMessage> roleContentMessages = new ArrayList<>();
		roleContentMessages.add(new RoleContentMessage("system", conversationCommand));
		roleContentMessages.add(new RoleContentMessage("user", text));
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
	public String getRecommendFromChatbot(Long memberId, List<Mission> missions) {
		WebClient webClient = WebClient.builder().build();
		String url = "https://api.openai.com/v1/chat/completions";

		List<MissionDetail> missionDetails = missionDetailService.findAll();

		List<RoleContentMessage> roleContentMessages = new ArrayList<>();
		roleContentMessages.add(new RoleContentMessage("system", recommendCommand + missionDetails.toString()));
		roleContentMessages.add(new RoleContentMessage("user", missions.toString()));
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

		System.out.println(responseString);

		List<String> parsedStrings = stringParsingService.parseLine(responseString);
		for(int i = 0; i < parsedStrings.size()-1; i++){
			String parsedString = parsedStrings.get(i);
			ChatbotChatting responseChatting = new ChatbotChatting(null, "bot", parsedString, LocalDateTime.now(), memberId);
			chatbotRepository.upsertByMemberId(memberId, responseChatting);
		}

		StringTokenizer st = new StringTokenizer(parsedStrings.get(parsedStrings.size()-1).substring(1, parsedStrings.get(parsedStrings.size()-1).length() - 1), ", ");
		List<Integer> numbers = new ArrayList<>();
		while(st.hasMoreTokens()) {
			numbers.add(Integer.parseInt(st.nextToken()));
		}

		// Mission을 숫자에 따라서 실제 미션으로 매핑
		List<MissionDetail> recommendedMissions = new ArrayList<>();
		for(Integer number : numbers){
			recommendedMissions.add(missionDetails.get(number));
		}

		// 미션을 저장하기
		missionService.addCompleteMission(memberId, recommendedMissions);

		return parsedStrings.get(0);
	}

	// 추천 받은 미션을 저장하고 챗봇 메시지 생성하는 부분
	// @Transactional
	// public List<String> createRecommendMessage(Long memberId, List<MissionDetail> recommendedMissions) {
	// 	WebClient webClient = WebClient.builder().build();
	// 	String url = "https://api.openai.com/v1/chat/completions";
	//
	// 	// 미션을 저장하기
	// 	missionService.addCompleteMission(memberId, recommendedMissions);
	//
	// 	String firstMissionContent = recommendedMissions.get(0).getContent();
	//
	// 	List<RoleContentMessage> roleContentMessages = new ArrayList<>();
	// 	roleContentMessages.add(new RoleContentMessage("system", missionAlarmCommand));
	// 	roleContentMessages.add(new RoleContentMessage("user", firstMissionContent));
	// 	OpenAiRequestDto dto = new OpenAiRequestDto("gpt-4o-mini", roleContentMessages);
	//
	// 	ResponseEntity<ChatCompletion> responseBody = webClient.post()
	// 			.uri(url)	// url 정의
	// 			.header("Content-Type", "application/json")
	// 			.header("Authorization", "Bearer " + api)
	// 			.bodyValue(dto)	// requestBody 정의
	// 			.retrieve()	// 응답 정의 시작
	// 			.toEntity(ChatCompletion.class)	// 응답 데이터 정의
	// 			.block();	// 동기식 처리
	//
	// 	ChatCompletion responseChatCompletion = responseBody.getBody();
	// 	String responseString = responseChatCompletion.getChoices().get(0).getMessage().getContent();
	//
	// 	List<String> parsedStrings = stringParsingService.parseLine(responseString);
	// 	for(String parsedString : parsedStrings){
	// 		ChatbotChatting responseChatting = new ChatbotChatting(null, "bot", parsedString, LocalDateTime.now(), memberId);
	// 		chatbotRepository.upsertByMemberId(memberId, responseChatting);
	// 	}
	//
	// 	return parsedStrings;
	// }
}

