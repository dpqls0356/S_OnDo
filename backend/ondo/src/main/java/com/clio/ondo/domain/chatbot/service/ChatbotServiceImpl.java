package com.clio.ondo.domain.chatbot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;
import com.clio.ondo.domain.chatbot.repository.ChatbotRepository;

@Service
public class ChatbotServiceImpl implements ChatbotService{
	@Autowired
	private ChatbotRepository chatbotRepository;

	public ChatbotChatting createChatting(ChatbotChatting chatbotChatting) {
		return chatbotRepository.save(chatbotChatting);
	}

	// public ChatbotChatting getChatbotChatting(String chatbotId) {
	// 	return chatbotRepository.findById(chatbotId);
	// }
}
