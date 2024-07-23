package com.clio.ondo.domain.chatbot.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.clio.ondo.domain.chatbot.model.ChatbotChatting;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

public interface ChatbotRepository extends MongoRepository<ChatbotChatting, String> {
}
